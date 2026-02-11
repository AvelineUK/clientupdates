import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import SignOutButton from '@/components/SignOutButton'
import ChangeEmailForm from '@/components/ChangeEmailForm'
import ChangePasswordForm from '@/components/ChangePasswordForm'
import DeleteAccountButton from '@/components/DeleteAccountButton'
import BrandingSettings from '@/components/BrandingSettings'

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

  const tierDisplay = profile?.subscription_tier === 'beta' ? 'Beta (Free)' : 
                       profile?.subscription_tier === 'pro' ? 'Pro' : 'Free'

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
        <h1 style={{ marginBottom: '2rem' }}>Account Settings</h1>

        {/* Subscription Status */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ marginBottom: '0.5rem' }}>Subscription</h3>
              <p className="text-secondary">Current plan: <strong style={{ color: 'var(--text-primary)' }}>{tierDisplay}</strong></p>
            </div>
            <Link href="/dashboard/billing" className="btn btn-secondary">
              Manage Billing
            </Link>
          </div>
        </div>

        {/* Branding Settings */}
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Custom Branding</h3>
          <BrandingSettings 
            userId={user.id}
            currentTier={profile?.subscription_tier || 'beta'}
            currentBranding={{
              logo_url: profile?.branding_logo_url,
              primary_color: profile?.branding_primary_color,
              company_name: profile?.branding_company_name,
            }}
          />
        </div>

        {/* Change Email */}
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Change Email</h3>
          <ChangeEmailForm currentEmail={user.email || ''} />
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