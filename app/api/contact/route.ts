import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { emailTemplate } from '@/lib/email-template'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      throw new Error('All fields are required')
    }

    // Send email to yourself (you'll receive the contact form submissions)
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: 'your-email@example.com', // Change this to YOUR email address
      replyTo: email, // So you can reply directly to the person
      subject: `Contact Form: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
      `,
    })

    // Send auto-reply to the person who contacted you
    const autoReplyContent = `
      <p>Thanks for reaching out! We've received your message and will get back to you as soon as possible.</p>
      <hr>
      <p><strong>Your message:</strong></p>
      <p style="background: #f9fafb; padding: 16px; border-radius: 8px; border-left: 4px solid #2563eb;">
        ${message.replace(/\n/g, '<br>')}
      </p>
      <p style="margin-top: 24px;">We typically respond within 24 hours. If your inquiry is urgent, please let us know in your message.</p>
    `

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: 'We received your message',
      html: emailTemplate({
        title: 'Message Received',
        preheader: 'Thanks for contacting Placeholder',
        content: autoReplyContent,
        footerText: 'This is an automated confirmation. We\'ll reply to your message shortly.'
      }),
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send message' },
      { status: 500 }
    )
  }
}