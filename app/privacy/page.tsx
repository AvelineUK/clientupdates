import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="container-sm" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link 
          href="/"
          style={{ 
            color: 'var(--primary)', 
            textDecoration: 'none',
            fontSize: '0.9375rem'
          }}
        >
          ← Back to Home
        </Link>
      </div>

      <h1 style={{ marginBottom: '1rem' }}>Privacy Policy</h1>
      <p className="text-secondary" style={{ marginBottom: '2rem' }}>
        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </p>

      <div className="card">
        <h2>1. Information We Collect</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <h2>3. Data Storage and Security</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>

        <h2>4. Sharing Your Information</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>

        <h2>5. Cookies and Tracking</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
        </p>

        <h2>6. Your Rights</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
        </p>

        <h2>7. Third-Party Services</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
        </p>

        <h2>8. Children's Privacy</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. If you have questions about this Privacy Policy, please <Link href="/contact" style={{ color: 'var(--primary)' }}>contact us</Link>.
        </p>
      </div>
    </div>
  )
}