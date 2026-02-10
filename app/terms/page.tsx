import Link from 'next/link'

export default function TermsPage() {
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

      <h1 style={{ marginBottom: '1rem' }}>Terms of Service</h1>
      <p className="text-secondary" style={{ marginBottom: '2rem' }}>
        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </p>

      <div className="card">
        <h2>1. Acceptance of Terms</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        <h2>2. Use of Service</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <h2>3. User Accounts</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>

        <h2>4. Payment and Billing</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>

        <h2>5. Intellectual Property</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
        </p>

        <h2>6. Termination</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
        </p>

        <h2>8. Changes to Terms</h2>
        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
        </p>
      </div>
    </div>
  )
}