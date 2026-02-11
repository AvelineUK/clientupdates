'use client'

import Link from 'next/link'
import { ProjectWithUpdates } from '@/lib/types'

interface ProjectListProps {
  projects: ProjectWithUpdates[]
}

export default function ProjectList({ projects }: ProjectListProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          No projects yet. Create your first project to get started!
        </p>
        <Link href="/dashboard/new" className="btn btn-primary">
          Create Project
        </Link>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60)
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours)
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`
    } else if (diffInHours < 48) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      })
    }
  }

  return (
    <div className="projects-grid">
      {projects.map((project) => {
        const latestUpdate = project.updates && project.updates.length > 0 
          ? project.updates[0] 
          : null
        const hasBeenViewed = project.last_view !== null

        return (
          <Link 
            key={project.id} 
            href={`/dashboard/projects/${project.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="card" style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}>
              <div style={{ marginBottom: '0.75rem' }}>
                <div className="flex items-center justify-between">
                  <h3 style={{ marginBottom: '0.25rem' }}>
                    {project.name}
                  </h3>
                  {latestUpdate && latestUpdate.status && (
                    <span className={`status-badge status-${latestUpdate.status.toLowerCase().replace(' ', '-')}`}>
                      {latestUpdate.status}
                    </span>
                  )}
                </div>
                <p className="text-secondary text-sm">
                  Client: {project.client_email}
                </p>
              </div>

              {latestUpdate && (
                <p 
                  className="text-secondary text-sm"
                  style={{ 
                    marginBottom: '0.75rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {latestUpdate.message}
                </p>
              )}

              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  Updated {formatDate(project.updated_at)}
                </div>
                <div>
                  {hasBeenViewed ? (
                    <span style={{ color: 'var(--success)' }}>
                      ✓ Viewed {formatDate(project.last_view!)}
                    </span>
                  ) : (
                    <span>Not viewed yet</span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}