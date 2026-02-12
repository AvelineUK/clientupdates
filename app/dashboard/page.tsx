import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import ProjectList from '@/components/ProjectList'
import SignOutButton from '@/components/SignOutButton'
import { canCreateProject, getProjectLimit } from '@/lib/tier-limits'

export default async function Dashboard() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/')
  }

  // Fetch user profile for tier info
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('subscription_tier')
    .eq('id', user.id)
    .single()

  const userTier = profile?.subscription_tier || 'free'

  // Fetch all projects for this user
  const { data: projects, error } = await supabase
    .from('projects')
    .select(`
      *,
      updates (
        id,
        message,
        status,
        created_at
      )
    `)
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
  }

  const projectCount = projects?.length || 0
  const canCreate = canCreateProject(userTier, projectCount)
  const projectLimit = getProjectLimit(userTier)

  // For each project, get the most recent view
  const projectsWithViews = await Promise.all(
    (projects || []).map(async (project) => {
      const { data: views } = await supabase
        .from('project_views')
        .select('viewed_at')
        .eq('project_id', project.id)
        .order('viewed_at', { ascending: false })
        .limit(1)

      return {
        ...project,
        last_view: views && views.length > 0 ? views[0].viewed_at : null,
        updates: project.updates || []
      }
    })
  )

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

      <div className="container" style={{ paddingTop: '2rem' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '2rem' }}>
          <div>
            <h1>My Projects</h1>
            {projectLimit !== null && (
              <p className="text-secondary text-sm" style={{ marginTop: '0.25rem' }}>
                {projectCount} of {projectLimit} projects used
              </p>
            )}
          </div>
          {canCreate ? (
            <Link href="/dashboard/new" className="btn btn-primary">
              Add Project
            </Link>
          ) : (
            <Link href="/dashboard/billing" className="btn btn-primary">
              Upgrade to Add More
            </Link>
          )}
        </div>

        {!canCreate && (
          <div className="card" style={{ background: 'var(--bg-tertiary)', marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Project Limit Reached</h3>
            <p className="text-secondary" style={{ marginBottom: '1rem' }}>
              You've reached the {projectLimit}-project limit on the Free plan. Upgrade to Pro for unlimited projects.
            </p>
            <Link href="/dashboard/billing" className="btn btn-primary">
              View Plans
            </Link>
          </div>
        )}

        <ProjectList projects={projectsWithViews} />
      </div>
    </div>
  )
}