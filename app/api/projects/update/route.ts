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
    const message = formData.get('message') as string
    const status = formData.get('status') as string | null
    const file = formData.get('file') as File | null

    // Get project details
    const { data: project } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single()

    if (!project) {
      throw new Error('Project not found')
    }

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

    // Create update
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

    // Update project's updated_at timestamp
    await supabase
      .from('projects')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', projectId)

    // Send email to client
    const statusPageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/status/${projectId}`
    
    const emailContent = `
      <p>A new update has been posted to your project <strong>${project.name}</strong>.</p>
      <p>Click the button below to view the latest update on your status page.</p>
      <hr>
      <p><strong>Update:</strong></p>
      <p>${message}</p>
      ${status ? `<p><strong>Status:</strong> <span style="display: inline-block; background: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 12px; font-size: 14px; font-weight: 500;">${status}</span></p>` : ''}
      ${fileUrl ? `<p style="margin-top: 16px;"><a href="${fileUrl}" style="color: #2563eb; text-decoration: none;">📎 Download: ${fileName}</a></p>` : ''}
    `
    
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: project.client_email,
        subject: `Update on ${project.name}`,
        html: emailTemplate({
          title: 'Project Update',
          preheader: `New update posted on ${project.name}`,
          content: emailContent,
          buttonText: 'View Status Page',
          buttonUrl: statusPageUrl,
          footerText: `You received this email because you're following updates for ${project.name}.`
        }),
      })
    } catch (emailError) {
      console.error('Email error:', emailError)
      // Don't fail the whole request if email fails
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error posting update:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to post update' },
      { status: 500 }
    )
  }
}