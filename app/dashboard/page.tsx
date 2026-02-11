import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import ProjectList from '@/components/ProjectList'
import SignOutButton from '@/components/SignOutButton'

export default async function Dashboard() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/')
  }

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
          <h1>My Projects</h1>
          <Link href="/dashboard/new" className="btn btn-primary">
            Add Project
          </Link>
        </div>

        <ProjectList projects={projectsWithViews} />
      </div>
    </div>
  )
}