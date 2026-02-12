import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="container-sm" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>

      <h1 style={{ marginBottom: '1rem' }}>Privacy Policy</h1>
      <p className="text-secondary" style={{ marginBottom: '2rem' }}>
        Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>

      <div className="card">
        <h2>1. Introduction</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Placeholder ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our project status update service.
        </p>

        <h2>2. Information We Collect</h2>
        <p style={{ marginBottom: '1rem' }}>We collect the following information:</p>
        <ul style={{ marginBottom: '1.5rem', marginLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>Account Information:</strong> Your email address and password (encrypted) when you create an account</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Project Data:</strong> Project names, client email addresses, status updates, and any files you upload</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Usage Data:</strong> Information about how you use our service, including when status pages are viewed</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Payment Information:</strong> Processed securely through Stripe (we do not store your card details)</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p style={{ marginBottom: '1rem' }}>We use your information to:</p>
        <ul style={{ marginBottom: '1.5rem', marginLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>Provide and maintain our service</li>
          <li style={{ marginBottom: '0.5rem' }}>Send project update notifications to your clients</li>
          <li style={{ marginBottom: '0.5rem' }}>Process payments and manage subscriptions</li>
          <li style={{ marginBottom: '0.5rem' }}>Communicate with you about your account or our service</li>
          <li style={{ marginBottom: '0.5rem' }}>Improve and optimize our service</li>
        </ul>

        <h2>4. Data Storage and Security</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Your data is stored securely using Supabase (PostgreSQL database) with industry-standard encryption. All data is stored within the EU. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2>5. Data Sharing</h2>
        <p style={{ marginBottom: '1rem' }}>We share your information only in the following circumstances:</p>
        <ul style={{ marginBottom: '1.5rem', marginLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>With Your Clients:</strong> Project updates are shared with the email addresses you provide</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Service Providers:</strong> We use Supabase (database), Resend (email delivery), and Stripe (payments) to provide our service</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
        </ul>
        <p style={{ marginBottom: '1.5rem' }}>We do not sell or rent your personal information to third parties.</p>

        <h2>6. Cookies and Tracking</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          We use essential cookies to maintain your login session. We do not use analytics or tracking cookies. You can disable cookies in your browser settings, but this may affect your ability to use our service.
        </p>

        <h2>7. Your Rights (UK GDPR)</h2>
        <p style={{ marginBottom: '1rem' }}>Under UK data protection law, you have the right to:</p>
        <ul style={{ marginBottom: '1.5rem', marginLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>Access your personal data</li>
          <li style={{ marginBottom: '0.5rem' }}>Correct inaccurate data</li>
          <li style={{ marginBottom: '0.5rem' }}>Request deletion of your data</li>
          <li style={{ marginBottom: '0.5rem' }}>Object to processing of your data</li>
          <li style={{ marginBottom: '0.5rem' }}>Export your data in a portable format</li>
          <li style={{ marginBottom: '0.5rem' }}>Withdraw consent at any time</li>
        </ul>
        <p style={{ marginBottom: '1.5rem' }}>
          To exercise these rights, please <Link href="/contact" style={{ textDecoration: 'none', color: 'var(--primary)' }}>contact us</Link>. You also have the right to lodge a complaint with the Information Commissioner's Office (ICO).
        </p>

        <h2>8. Data Retention</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          We retain your personal data for as long as your account is active. When you delete your account, we permanently delete your personal information and project data within 30 days, except where we're required by law to retain it longer.
        </p>

        <h2>9. International Transfers</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Your data is stored within the EU. If we need to transfer data outside the EU, we will ensure appropriate safeguards are in place as required by UK GDPR.
        </p>

        <h2>10. Children's Privacy</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Our service is not intended for children under 16. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us.
        </p>

        <h2>11. Changes to This Policy</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          We may update this Privacy Policy from time to time. We will notify you of significant changes by email or through our service. Continued use of our service after changes constitutes acceptance of the updated policy.
        </p>

        <h2>12. Contact Us</h2>
        <p style={{ marginBottom: '0.5rem' }}>
          If you have questions about this Privacy Policy or wish to exercise your data rights, please contact us:
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