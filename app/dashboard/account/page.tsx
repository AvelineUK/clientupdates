import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import SignOutButton from '@/components/SignOutButton'
import ChangePasswordForm from '@/components/ChangePasswordForm'
import DeleteAccountButton from '@/components/DeleteAccountButton'
import SubscriptionCard from '@/components/SubscriptionCard'

export default async function AccountPage() {
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

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            <Link href="/dashboard" className="logo">
              Placeholder
            </Link>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Link href="/dashboard/account" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.9375rem' }}>
                Account
              </Link>
              <SignOutButton />
            </div>
          </div>
        </div>
      </nav>

      <div className="container-sm">
        <div style={{ marginBottom: '2rem' }}>
          <Link 
            href="/dashboard"
            style={{ 
              color: 'var(--primary)', 
              textDecoration: 'none',
              fontSize: '0.9375rem'
            }}
          >
            ← Back to Dashboard
          </Link>
        </div>

        <h1 style={{ marginBottom: '2rem' }}>Account Settings</h1>

        {/* Subscription */}
        <SubscriptionCard 
          currentTier={profile?.subscription_tier || 'beta'}
          status={profile?.subscription_status || 'active'}
        />

        {/* Account Info */}
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Account Information</h3>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={user.email || ''}
              disabled
              style={{ background: 'var(--bg-secondary)', cursor: 'not-allowed' }}
            />
            <p className="text-secondary text-sm" style={{ marginTop: '0.25rem' }}>
              Email cannot be changed
            </p>
          </div>
        </div>

        {/* Change Password */}
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Change Password</h3>
          <ChangePasswordForm />
        </div>

        {/* Delete Account */}
        <div className="card" style={{ borderColor: 'var(--danger)' }}>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--danger)' }}>Danger Zone</h3>
          <p className="text-secondary text-sm" style={{ marginBottom: '1rem' }}>
            Once you delete your account, there is no going back. All your projects and data will be permanently deleted.
          </p>
          <DeleteAccountButton userId={user.id} />
        </div>
      </div>
    </div>
  )
}