import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { emailTemplate } from '@/lib/email-template'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const projectId = formData.get('projectId') as string
    const userId = formData.get('userId') as string
    const name = formData.get('name') as string
    const clientEmail = formData.get('clientEmail') as string
    const message = formData.get('message') as string
    const status = formData.get('status') as string | null
    const file = formData.get('file') as File | null

    // Handle file upload if present
    let fileUrl = null
    let fileName = null
    
    if (file) {
      const fileBuffer = await file.arrayBuffer()
      const fileExt = file.name.split('.').pop()
      const filePath = `${projectId}/${Date.now()}.${fileExt}`
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('project-files')
        .upload(filePath, fileBuffer, {
          contentType: file.type,
        })

      if (uploadError) {
        console.error('File upload error:', uploadError)
      } else {
        const { data: { publicUrl } } = supabase.storage
          .from('project-files')
          .getPublicUrl(filePath)
        
        fileUrl = publicUrl
        fileName = file.name
      }
    }

    // Create project
    const { error: projectError } = await supabase
      .from('projects')
      .insert({
        id: projectId,
        user_id: userId,
        name,
        client_email: clientEmail,
      })

    if (projectError) {
      throw new Error(`Failed to create project: ${projectError.message}`)
    }

    // Create initial update
    const { error: updateError } = await supabase
      .from('updates')
      .insert({
        project_id: projectId,
        message,
        status,
        file_url: fileUrl,
        file_name: fileName,
      })

    if (updateError) {
      throw new Error(`Failed to create update: ${updateError.message}`)
    }

    // Send email to client
    const statusPageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/status/${projectId}`
    
    const emailContent = `
      <p>A project status page has been created for <strong>${name}</strong>.</p>
      <p>You can view updates anytime by clicking the button below or visiting your unique status page link.</p>
      <hr>
      <p><strong>Latest Update:</strong></p>
      <p>${message}</p>
      ${status ? `<p><strong>Status:</strong> <span style="display: inline-block; background: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 12px; font-size: 14px; font-weight: 500;">${status}</span></p>` : ''}
      ${fileUrl ? `<p style="margin-top: 16px;"><a href="${fileUrl}" style="color: #2563eb; text-decoration: none;">📎 Download: ${fileName}</a></p>` : ''}
    `
    
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: clientEmail,
        subject: `New project: ${name}`,
        html: emailTemplate({
          title: 'New Project Created',
          preheader: `Your project status page for ${name} is ready`,
          content: emailContent,
          buttonText: 'View Status Page',
          buttonUrl: statusPageUrl,
          footerText: `You received this email because a project status page was created for you. You can bookmark your status page at: ${statusPageUrl}`
        }),
      })
    } catch (emailError) {
      console.error('Email error:', emailError)
      // Don't fail the whole request if email fails
    }

    return NextResponse.json({ success: true, projectId })
  } catch (error: any) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create project' },
      { status: 500 }
    )
  }
}