import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import ViewTracker from '@/components/ViewTracker'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function StatusPage({ params }: { params: { id: string } }) {
  const { id } = await params

  // Fetch project
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (projectError || !project) {
    notFound()
  }

  // Fetch user branding separately
  const { data: userProfile } = await supabase
    .from('user_profiles')
    .select('branding_logo_url, branding_primary_color, branding_company_name')
    .eq('id', project.user_id)
    .single()

  // Fetch updates
  const { data: updates } = await supabase
    .from('updates')
    .select('*')
    .eq('project_id', id)
    .order('created_at', { ascending: false })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  const latestUpdate = updates && updates.length > 0 ? updates[0] : null
  
  // Get branding (if user has it)
  const logo = userProfile?.branding_logo_url
  const companyName = userProfile?.branding_company_name || 'Placeholder'
  const primaryColor = userProfile?.branding_primary_color || '#0f172a'

  return (
    <>
      <ViewTracker projectId={id} />
      
      <div className="container-sm page-container">
        <div className="status-page-header">
          <div className="status-page-badge">
            {logo ? (
              <img src={logo} alt={companyName} style={{ maxHeight: '40px', maxWidth: '160px' }} />
            ) : (
              <span>{companyName}</span>
            )}
          </div>
          <h1>{project.name}</h1>
          <p className="text-secondary">Project Status Page</p>
        </div>

        {!latestUpdate ? (
          <div className="card empty-state">
            <p className="text-secondary">No updates yet. Check back soon!</p>
          </div>
        ) : (
          <>
            {/* Latest Update */}
            <div className="card latest-update">
              <div className="update-meta">
                <span className="update-date">
                  Latest Update · {formatDate(latestUpdate.created_at)}
                </span>
                {latestUpdate.status && (
                  <span className={`status-badge status-${latestUpdate.status.toLowerCase().replace(' ', '-')}`}>
                    {latestUpdate.status}
                  </span>
                )}
              </div>
              <p className="update-content">{latestUpdate.message}</p>
              {latestUpdate.file_url && (
                <div style={{ marginTop: '1.25rem' }}>
                  <a 
                    href={latestUpdate.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ 
                      backgroundColor: primaryColor,
                      color: 'white',
                      borderColor: primaryColor
                    }}
                  >
                    📎 {latestUpdate.file_name}
                  </a>
                </div>
              )}
            </div>

            {/* Previous Updates */}
            {updates && updates.length > 1 && (
              <div className="card">
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Previous Updates</h2>
                {updates.slice(1).map((update) => (
                  <div key={update.id} className="update-item">
                    <div className="update-meta">
                      <span className="text-sm text-secondary">
                        {formatDate(update.created_at)}
                      </span>
                      {update.status && (
                        <span className={`status-badge status-${update.status.toLowerCase().replace(' ', '-')}`}>
                          {update.status}
                        </span>
                      )}
                    </div>
                    <p style={{ color: 'var(--text-primary)' }}>{update.message}</p>
                    {update.file_url && (
                      <p style={{ marginTop: '0.75rem' }}>
                        <a 
                          href={update.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: primaryColor, textDecoration: 'none', fontSize: '0.875rem' }}
                        >
                          📎 {update.file_name}
                        </a>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <div className="status-footer">
          <p className="text-secondary text-sm">
            Powered by <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Placeholder</span>
          </p>
        </div>
      </div>
    </>
  )
}