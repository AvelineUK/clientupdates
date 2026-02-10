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

  return (
    <>
      <ViewTracker projectId={id} />
      
      <div className="container-sm" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ 
            display: 'inline-block',
            padding: '0.5rem 1rem',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius)',
            marginBottom: '1rem'
          }}>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>
              Placeholder
            </span>
          </div>
          <h1 style={{ marginBottom: '0.5rem' }}>{project.name}</h1>
          <p className="text-secondary">Project Status Page</p>
        </div>

        {!latestUpdate ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <p className="text-secondary">No updates yet. Check back soon!</p>
          </div>
        ) : (
          <>
            {/* Latest Update - Featured */}
            <div className="card" style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              marginBottom: '2rem'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <span style={{ opacity: 0.9, fontSize: '0.875rem' }}>
                  {formatDate(latestUpdate.created_at)}
                </span>
                {latestUpdate.status && (
                  <span style={{ 
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: 500
                  }}>
                    {latestUpdate.status}
                  </span>
                )}
              </div>
              <p style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
                {latestUpdate.message}
              </p>
              {latestUpdate.file_url && (
                <div style={{ marginTop: '1rem' }}>
                  <a 
                    href={latestUpdate.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      display: 'inline-block',
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      padding: '0.625rem 1.25rem',
                      borderRadius: 'var(--radius)',
                      textDecoration: 'none',
                      fontSize: '0.9375rem',
                      fontWeight: 500
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
                <h2 style={{ marginBottom: '1.5rem' }}>Previous Updates</h2>
                {updates.slice(1).map((update, index) => (
                  <div 
                    key={update.id}
                    style={{ 
                      paddingTop: index === 0 ? 0 : '1.5rem',
                      paddingBottom: '1.5rem',
                      borderBottom: index < updates.length - 2 ? '1px solid var(--border)' : 'none'
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.75rem'
                    }}>
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
                      <p style={{ marginTop: '0.75rem' }}>
                        <a 
                          href={update.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'var(--primary)', textDecoration: 'none' }}
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

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p className="text-secondary text-sm">
            Powered by <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Placeholder</span>
          </p>
        </div>
      </div>
    </>
  )
}