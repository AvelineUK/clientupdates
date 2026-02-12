import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="container-sm" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>

      <h1 style={{ marginBottom: '1rem' }}>Terms of Service</h1>
      <p className="text-secondary" style={{ marginBottom: '2rem' }}>
        Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>

      <div className="card">
        <h2>1. Acceptance of Terms</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          By accessing or using Placeholder ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the Service. These terms constitute a legally binding agreement between you and [YOUR COMPANY NAME] ("we", "us", or "our").
        </p>

        <h2>2. Description of Service</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Placeholder provides a platform for freelancers, consultants, and agencies to share project status updates with their clients. The Service allows you to create projects, post updates, share status pages, and send email notifications.
        </p>

        <h2>3. Account Registration</h2>
        <p style={{ marginBottom: '1rem' }}>To use the Service, you must:</p>
        <ul style={{ marginBottom: '1.5rem', marginLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>Provide accurate and complete registration information</li>
          <li style={{ marginBottom: '0.5rem' }}>Maintain the security of your account password</li>
          <li style={{ marginBottom: '0.5rem' }}>Be at least 16 years old</li>
          <li style={{ marginBottom: '0.5rem' }}>Accept responsibility for all activity under your account</li>
        </ul>
        <p style={{ marginBottom: '1.5rem' }}>
          You may not share your account credentials or allow others to access your account. You must notify us immediately of any unauthorized access.
        </p>

        <h2>4. Acceptable Use</h2>
        <p style={{ marginBottom: '1rem' }}>You agree not to:</p>
        <ul style={{ marginBottom: '1.5rem', marginLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>Use the Service for any illegal or unauthorized purpose</li>
          <li style={{ marginBottom: '0.5rem' }}>Upload malicious code, viruses, or harmful content</li>
          <li style={{ marginBottom: '0.5rem' }}>Harass, abuse, or harm others through the Service</li>
          <li style={{ marginBottom: '0.5rem' }}>Attempt to gain unauthorized access to our systems</li>
          <li style={{ marginBottom: '0.5rem' }}>Use the Service to send spam or unsolicited communications</li>
          <li style={{ marginBottom: '0.5rem' }}>Scrape, copy, or misuse our Service or content</li>
          <li style={{ marginBottom: '0.5rem' }}>Circumvent any usage limits or restrictions</li>
        </ul>
        <p style={{ marginBottom: '1.5rem' }}>
          We reserve the right to suspend or terminate accounts that violate these terms.
        </p>

        <h2>5. Subscription Plans and Payments</h2>
        <p style={{ marginBottom: '1rem' }}>
          <strong>Free Plan:</strong> Includes up to 3 projects with basic features. Free indefinitely.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          <strong>Pro Plan:</strong> £12/month, billed monthly. Includes unlimited projects, custom branding, and file attachments.
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          Payments are processed through Stripe. Subscriptions automatically renew unless cancelled. You may cancel at any time, and your access will continue until the end of your billing period. No refunds for partial months. We reserve the right to change pricing with 30 days' notice.
        </p>

        <h2>6. Content and Intellectual Property</h2>
        <p style={{ marginBottom: '1rem' }}>
          <strong>Your Content:</strong> You retain all rights to the content you upload (project updates, files, etc.). By using the Service, you grant us a license to store, display, and transmit your content as necessary to provide the Service.
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          <strong>Our Content:</strong> The Service, including its design, features, and functionality, is owned by us and protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, or reverse engineer any part of the Service.
        </p>

        <h2>7. Data and Privacy</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Your use of the Service is also governed by our <Link href="/privacy" style={{ textDecoration: 'none', color: 'var(--primary)' }}>Privacy Policy</Link>. We process your data in accordance with UK GDPR and data protection laws.
        </p>

        <h2>8. Service Availability</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          We strive to provide reliable service but do not guarantee uninterrupted access. We may perform maintenance, updates, or experience downtime. We are not liable for any losses resulting from service interruptions.
        </p>

        <h2>9. Termination</h2>
        <p style={{ marginBottom: '1rem' }}>
          <strong>By You:</strong> You may terminate your account at any time through your account settings. Upon termination, your data will be deleted within 30 days.
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          <strong>By Us:</strong> We may suspend or terminate your account if you violate these terms, engage in fraudulent activity, or for any reason with notice. Upon termination, you lose access to the Service and your data.
        </p>

        <h2>10. Limitation of Liability</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          To the maximum extent permitted by law, we are not liable for any indirect, incidental, consequential, or punitive damages arising from your use of the Service. Our total liability for any claims shall not exceed the amount you paid us in the 12 months prior to the claim. Some jurisdictions do not allow these limitations, so they may not apply to you.
        </p>

        <h2>11. Indemnification</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          You agree to indemnify and hold us harmless from any claims, damages, or expenses arising from your use of the Service, your content, or your violation of these terms.
        </p>

        <h2>12. Disputes and Governing Law</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          These Terms are governed by the laws of England and Wales. Any disputes shall be resolved in the courts of England and Wales. For informal dispute resolution, please contact us first.
        </p>

        <h2>13. Changes to Terms</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          We may update these Terms from time to time. We will notify you of material changes via email or through the Service. Continued use after changes constitutes acceptance. If you don't agree to the updated terms, you must stop using the Service.
        </p>

        <h2>14. Severability</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full effect.
        </p>

        <h2>15. Contact</h2>
        <p style={{ marginBottom: '0.5rem' }}>
          For questions about these Terms, please contact us:
        </p>
        <p style={{ marginBottom: '0.5rem' }}>
          <strong>[YOUR COMPANY NAME]</strong><br />
          [YOUR ADDRESS]<br />
          [YOUR CITY, POSTCODE]<br />
          United Kingdom
        </p>
        <p>
          Email: <Link href="/contact" style={{ textDecoration: 'none', color: 'var(--primary)' }}>Contact form</Link>
        </p>
      </div>
    </div>
  )
}