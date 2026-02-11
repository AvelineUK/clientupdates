'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { nanoid } from 'nanoid'

interface NewProjectFormProps {
  userId: string
}

const STATUS_OPTIONS = [
  'Discovery',
  'In Progress',
  'Review',
  'Complete'
]

export default function NewProjectForm({ userId }: NewProjectFormProps) {
  const [name, setName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const projectId = nanoid(10)
      
      const formData = new FormData()
      formData.append('projectId', projectId)
      formData.append('userId', userId)
      formData.append('name', name)
      formData.append('clientEmail', clientEmail)
      formData.append('message', message)
      if (status) formData.append('status', status)
      if (file) formData.append('file', file)

      const response = await fetch('/api/projects/create', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create project')
      }

      router.push('/dashboard')
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
        <label htmlFor="name">Project Name *</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Website Redesign"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="clientEmail">Client Email *</label>
        <input
          id="clientEmail"
          type="email"
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
          required
          placeholder="client@example.com"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Initial Update *</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="Getting started on your project. I'll keep you updated on progress here..."
          disabled={loading}
        />
        <p className="text-secondary text-sm" style={{ marginTop: '0.25rem' }}>
          This will be the first update your client sees.
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="status">Status (optional)</label>
        <select
          id="status"
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
        <label htmlFor="file">Attachment (optional)</label>
        <input
          id="file"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          disabled={loading}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
        />
        <p className="text-secondary text-sm" style={{ marginTop: '0.25rem' }}>
          PDF, DOC, or image files accepted
        </p>
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
          {loading ? 'Creating...' : 'Create Project'}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => router.push('/dashboard')}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}