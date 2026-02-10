interface EmailTemplateProps {
  title: string
  preheader?: string
  content: string
  buttonText?: string
  buttonUrl?: string
  footerText?: string
}

export function emailTemplate({
  title,
  preheader,
  content,
  buttonText,
  buttonUrl,
  footerText
}: EmailTemplateProps): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${preheader ? `<meta name="description" content="${preheader}">` : ''}
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #111827;
            background-color: #f9fafb;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px;
            text-align: center;
          }
          .logo {
            color: #ffffff;
            font-size: 28px;
            font-weight: 700;
            text-decoration: none;
          }
          .content {
            padding: 40px 30px;
          }
          .title {
            font-size: 24px;
            font-weight: 700;
            margin: 0 0 20px 0;
            color: #111827;
          }
          .button {
            display: inline-block;
            background-color: #2563eb;
            color: #ffffff !important;
            padding: 14px 28px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
          }
          .footer {
            background-color: #f9fafb;
            padding: 30px;
            text-align: center;
            color: #6b7280;
            font-size: 14px;
            border-top: 1px solid #e5e7eb;
          }
          .footer a {
            color: #2563eb;
            text-decoration: none;
          }
          hr {
            border: none;
            border-top: 1px solid #e5e7eb;
            margin: 24px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Placeholder</div>
          </div>
          
          <div class="content">
            <h1 class="title">${title}</h1>
            ${content}
            ${buttonText && buttonUrl ? `
              <div style="text-align: center; margin: 30px 0;">
                <a href="${buttonUrl}" class="button">${buttonText}</a>
              </div>
            ` : ''}
          </div>
          
          <div class="footer">
            <p>
              ${footerText || 'You received this email because you are using Placeholder.'}
            </p>
            <p style="margin-top: 10px;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/about">About</a> · 
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/contact">Contact</a> · 
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/privacy">Privacy</a>
            </p>
            <p style="margin-top: 10px; color: #9ca3af;">
              © ${new Date().getFullYear()} Placeholder. All rights reserved.
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}