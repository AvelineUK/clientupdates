'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { canUploadFiles } from '@/lib/tier-limits'

interface ProjectUpdateFormProps {
  projectId: string
  userTier?: string
}

const STATUS_OPTIONS = [
  'Discovery',
  'In Progress',
  'Review',
  'Complete'
]

export default function ProjectUpdateForm({ projectId, userTier = 'free' }: ProjectUpdateFormProps) {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const canAttachFiles = canUploadFiles(userTier)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('projectId', projectId)
      formData.append('message', message)
      if (status) formData.append('status', status)
      if (file) formData.append('file', file)

      const response = await fetch('/api/projects/update', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to post update')
      }

      // Clear form
      setMessage('')
      setStatus('')
      setFile(null)
      
      // Reset file input
      const fileInput = document.getElementById('update-file') as HTMLInputElement
      if (fileInput) fileInput.value = ''

      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-horizontal">
      <div className="form-group">
        <label htmlFor="update-message">Update Message *</label>
        <textarea
          id="update-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="Design mockups are complete and ready for review..."
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="update-status">Status (optional)</label>
        <select
          id="update-status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={loading}
        >
          <option value="">-- Select Status --</option>
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="update-file">Attachment (optional)</label>
        <div>
          <input
            id="update-file"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            disabled={loading || !canAttachFiles}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
          />
          {!canAttachFiles && (
            <p className="text-secondary text-sm" style={{ marginTop: '0.25rem' }}>
              File attachments available on Pro plan. <Link href="/dashboard/billing" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Upgrade →</Link>
            </p>
          )}
        </div>
      </div>

      {error && (
        <div className="error-message" style={{ marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post Update'}
        </button>
      </div>
    </form>
  )
}