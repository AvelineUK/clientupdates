'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface DeleteProjectButtonProps {
  projectId: string
  projectName: string
}

export default function DeleteProjectButton({ projectId, projectName }: DeleteProjectButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleDelete = async () => {
    if (confirmText !== projectName) {
      setError('Project name does not match')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/projects/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete project')
      }

      router.push('/dashboard')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  if (!showConfirm) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
        <button
        onClick={() => setShowConfirm(true)}
        className="btn btn-danger"
      >
        Delete Project
      </button>
      </div>
    )
  }

  return (
    <div>
      <p style={{ marginBottom: '1rem' }}>
        Type <strong>{projectName}</strong> to confirm deletion:
      </p>
      <div className="form-group">
        <input
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="Type project name"
          disabled={loading}
        />
      </div>
      {error && (
        <div className="error-message" style={{ marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      <div className="flex gap-2" style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
        <button
          onClick={handleDelete}
          className="btn btn-danger"
          disabled={loading || confirmText !== projectName}
        >
          {loading ? 'Deleting...' : 'Confirm Delete'}
        </button>
        <button
          onClick={() => {
            setShowConfirm(false)
            setConfirmText('')
            setError('')
          }}
          className="btn btn-secondary"
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}