import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { emailTemplate } from '@/lib/email-template'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      throw new Error('Email is required')
    }

    const emailContent = `
      <p>Thanks for signing up for Placeholder! We're excited to have you on board.</p>
      <p>Placeholder makes it easy to keep your clients updated on project progress without the email chaos.</p>
      <hr>
      <h3 style="margin-top: 24px;">Getting Started</h3>
      <p><strong>1. Create a project</strong><br>
      Click "Add Project" on your dashboard to create your first project.</p>
      
      <p><strong>2. Add your client's email</strong><br>
      Your client will automatically receive a link to their status page.</p>
      
      <p><strong>3. Post updates</strong><br>
      Whenever you post an update, your client gets notified instantly.</p>
      
      <hr>
      <p style="margin-top: 24px;"><strong>🎉 Beta Access</strong></p>
      <p>You have full access to all features during our beta period - completely free! Thank you for being an early adopter.</p>
      
      <p style="margin-top: 24px;">If you have any questions or feedback, just hit reply to this email or visit our <a href="${process.env.NEXT_PUBLIC_APP_URL}/contact" style="color: #2563eb;">contact page</a>.</p>
    `

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: 'Welcome to Placeholder! 🎉',
      html: emailTemplate({
        title: 'Welcome to Placeholder!',
        preheader: 'Get started with simple project updates for your clients',
        content: emailContent,
        buttonText: 'Go to Dashboard',
        buttonUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
        footerText: 'Welcome to Placeholder! If you have any questions, we\'re here to help.'
      }),
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Welcome email error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send welcome email' },
      { status: 500 }
    )
  }
}