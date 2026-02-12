'use client'

interface SubscriptionCardProps {
  currentTier: string
  status: string
}

export default function SubscriptionCard({ currentTier, status }: SubscriptionCardProps) {
  const isBeta = currentTier === 'beta'

  return (
    <div className="card">
      <h3 style={{ marginBottom: '1rem' }}>Subscription</h3>
      
      {isBeta && (
        <div style={{ 
          padding: '1rem', 
          background: 'var(--bg-tertiary)', 
          color: 'var(--text-primary)',
          border: '2px solid var(--primary)',
          borderRadius: 'var(--radius)',
          marginBottom: '1.5rem',
          fontSize: '0.9375rem'
        }}>
          <strong>Free Beta Access</strong>
          <p style={{ marginTop: '0.5rem', marginBottom: 0, color: 'var(--text-secondary)' }}>
            You have unlimited access to all features during our beta period. Thank you for being an early adopter!
          </p>
        </div>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        {/* Free Plan */}
        <div style={{ 
          border: '2px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '1.5rem',
          opacity: isBeta ? 0.6 : 1
        }}>
          <h4 style={{ marginBottom: '0.5rem' }}>Free</h4>
          <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
            $0<span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-secondary)' }}>/month</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem', fontSize: '0.9375rem' }}>✓ 3 projects</li>
            <li style={{ marginBottom: '0.5rem', fontSize: '0.9375rem' }}>✓ Unlimited updates</li>
            <li style={{ marginBottom: '0.5rem', fontSize: '0.9375rem' }}>✓ Email notifications</li>
            <li style={{ marginBottom: '0.5rem', fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>✗ File attachments</li>
            <li style={{ marginBottom: '0.5rem', fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>✗ Custom branding</li>
          </ul>
          <button 
            className="btn btn-secondary" 
            style={{ width: '100%' }}
            disabled={true}
          >
            {isBeta ? 'Coming Soon' : 'Current Plan'}
          </button>
        </div>

        {/* Pro Plan */}
        <div style={{ 
          border: '2px solid var(--primary)',
          borderRadius: 'var(--radius)',
          padding: '1.5rem',
          position: 'relative',
          opacity: isBeta ? 0.6 : 1
        }}>
          <h4 style={{ marginBottom: '0.5rem' }}>Pro</h4>
          <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
            $12<span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-secondary)' }}>/month</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem', fontSize: '0.9375rem' }}>✓ Unlimited projects</li>
            <li style={{ marginBottom: '0.5rem', fontSize: '0.9375rem' }}>✓ Unlimited updates</li>
            <li style={{ marginBottom: '0.5rem', fontSize: '0.9375rem' }}>✓ Email notifications</li>
            <li style={{ marginBottom: '0.5rem', fontSize: '0.9375rem' }}>✓ File attachments</li>
            <li style={{ marginBottom: '0.5rem', fontSize: '0.9375rem' }}>✓ Custom branding</li>
          </ul>
          <button 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            disabled={true}
          >
            {isBeta ? 'Coming Soon' : 'Upgrade to Pro'}
          </button>
        </div>
      </div>

      {isBeta && (
        <p className="text-secondary text-sm" style={{ textAlign: 'center', marginTop: '1rem' }}>
          Paid plans will launch after the beta period. You'll be notified before any charges begin.
        </p>
      )}
    </div>
  )
}