import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import SignOutButton from '@/components/SignOutButton'
import ProjectUpdateForm from '@/components/ProjectUpdateForm'
import DeleteProjectButton from '@/components/DeleteProjectButton'
import CopyToClipboard from '@/components/CopyToClipboard'

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/')
  }

  const { id } = await params

  // Fetch user profile for tier info
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('subscription_tier')
    .eq('id', user.id)
    .single()

  const userTier = profile?.subscription_tier || 'free'

  // Fetch project
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (projectError || !project) {
    redirect('/dashboard')
  }

  // Fetch updates
  const { data: updates } = await supabase
    .from('updates')
    .select('*')
    .eq('project_id', id)
    .order('created_at', { ascending: false })

  // Get view tracking
  const { data: views } = await supabase
    .from('project_views')
    .select('viewed_at')
    .eq('project_id', id)
    .order('viewed_at', { ascending: false })

  const statusPageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/status/${id}`

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
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
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ marginBottom: '0.5rem' }}>{project.name}</h1>
          <p className="text-secondary">Client: {project.client_email}</p>
        </div>

        {/* Status Page Link */}
        <div className="card" style={{ background: 'var(--bg-secondary)' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Client Status Page</h3>
          <div style={{ marginBottom: '1rem' }}>
            <p className="text-sm text-secondary" style={{ marginBottom: '0.5rem' }}>
              Share this link with your client:
            </p>
            <code style={{ 
              display: 'block', 
              padding: '0.75rem', 
              borderRadius: 'var(--radius)',
              fontSize: '0.875rem',
              wordBreak: 'break-all',
              userSelect: 'all'
            }}>
              {statusPageUrl}
            </code>
          </div>
          <div className="flex gap-2">
            <CopyToClipboard text={statusPageUrl} />
            <a 
              href={statusPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Preview Status Page
            </a>
          </div>
          {views && views.length > 0 && (
            <p className="text-sm" style={{ marginTop: '0.75rem', color: 'var(--success)' }}>
              ✓ Last viewed: {formatDate(views[0].viewed_at)}
            </p>
          )}
        </div>

        {/* Post Update */}
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Post Update</h3>
          <ProjectUpdateForm projectId={id} userTier={userTier} />
        </div>

        {/* Update History */}
        <div className="card">
          <div className="card-header" style={{ marginBottom: 0, paddingBottom: 0, border: 'none' }}>
            <h3 style={{ marginBottom: 0 }}>Update History</h3>
          </div>
          
          {!updates || updates.length === 0 ? (
            <p className="text-secondary">No updates yet.</p>
          ) : (
            <div style={{ marginTop: '1rem' }}>
              {updates.map((update, index) => (
                <div 
                  key={update.id}
                  style={{ 
                    paddingTop: index === 0 ? 0 : '1rem',
                    paddingBottom: '1rem',
                    borderBottom: index < updates.length - 1 ? '1px solid var(--border)' : 'none'
                  }}
                >
                  <div className="flex items-center justify-between" style={{ marginBottom: '0.5rem' }}>
                    <span className="text-sm text-secondary">
                      {formatDate(update.created_at)}
                    </span>
                    {update.status && (
                      <span className={`status-badge status-${update.status.toLowerCase().replace(' ', '-')}`}>
                        {update.status}
                      </span>
                    )}
                  </div>
                  <p>{update.message}</p>
                  {update.file_url && (
                    <p style={{ marginTop: '0.5rem' }}>
                      <a 
                        href={update.file_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: 'var(--primary)' }}
                      >
                        📎 {update.file_name}
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delete Project */}
        <div className="card" style={{ borderColor: 'var(--danger)' }}>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--danger)' }}>Danger Zone</h3>
          <p className="text-secondary text-sm" style={{ marginBottom: '1rem' }}>
            Once you delete a project, there is no going back. Please be certain.
          </p>
          <DeleteProjectButton projectId={id} projectName={project.name} />
        </div>
      </div>
    </div>
  )
}