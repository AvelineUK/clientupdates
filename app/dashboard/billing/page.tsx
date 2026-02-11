import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import SignOutButton from '@/components/SignOutButton'
import SubscriptionCard from '@/components/SubscriptionCard'
import CancelSubscription from '@/components/CancelSubscription'

export default async function BillingPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/')
  }

  // Fetch user profile (subscription info)
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const isPro = profile?.subscription_tier === 'pro'
  const isBeta = profile?.subscription_tier === 'beta'

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            <Link href="/dashboard" className="logo">
              Placeholder
            </Link>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Link href="/dashboard" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.875rem' }}>
                Dashboard
              </Link>
              <Link href="/dashboard/account" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.875rem' }}>
                Account
              </Link>
              <SignOutButton />
            </div>
          </div>
        </div>
      </nav>

      <div className="container-sm" style={{ paddingTop: '2rem' }}>

        <h1 style={{ marginBottom: '2rem' }}>Billing & Subscription</h1>

        {/* Current Status */}
        {isPro && (
          <div className="card" style={{ background: 'var(--bg-tertiary)', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>✓</span>
              <h3 style={{ margin: 0 }}>Pro Plan Active</h3>
            </div>
            <p className="text-secondary">
              You have full access to all features including custom branding and unlimited projects.
            </p>
          </div>
        )}

        {/* Subscription Plans */}
        <SubscriptionCard 
          currentTier={profile?.subscription_tier || 'beta'}
          status={profile?.subscription_status || 'active'}
        />

        {/* Billing History */}
        {isPro && (
          <div className="card">
            <h3 style={{ marginBottom: '1rem' }}>Billing History</h3>
            <p className="text-secondary text-sm" style={{ marginBottom: '1rem' }}>
              Your billing history will appear here once Stripe is connected.
            </p>
            <div style={{ 
              padding: '2rem', 
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius)',
              border: '1px dashed var(--border)',
              textAlign: 'center'
            }}>
              <p className="text-secondary">No invoices yet</p>
            </div>
          </div>
        )}

        {/* Cancel Subscription */}
        {isPro && !isBeta && (
          <div className="card" style={{ borderColor: 'var(--danger)' }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--danger)' }}>Cancel Subscription</h3>
            <p className="text-secondary text-sm" style={{ marginBottom: '1rem' }}>
              Cancelling will downgrade your account to the Free plan at the end of your billing period.
            </p>
            <CancelSubscription userId={user.id} />
          </div>
        )}
      </div>
    </div>
  )
}