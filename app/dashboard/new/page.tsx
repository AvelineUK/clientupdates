import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import NewProjectForm from '@/components/NewProjectForm'
import SignOutButton from '@/components/SignOutButton'

export default async function NewProject() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/')
  }

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

        <h1 style={{ marginBottom: '2rem' }}>Create New Project</h1>

        <div className="card">
          <NewProjectForm userId={user.id} />
        </div>
      </div>
    </div>
  )
}