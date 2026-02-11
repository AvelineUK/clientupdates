'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface ChangeEmailFormProps {
  currentEmail: string
}

export default function ChangeEmailForm({ currentEmail }: ChangeEmailFormProps) {
  const [newEmail, setNewEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    if (newEmail === currentEmail) {
      setError('New email must be different from current email')
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({
        email: newEmail
      })

      if (error) throw error

      setSuccess(true)
      setNewEmail('')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-horizontal">
      <div className="form-group">
        <label htmlFor="current-email">Current Email</label>
        <input
          id="current-email"
          type="email"
          value={currentEmail}
          disabled
          style={{ background: 'var(--bg-secondary)', cursor: 'not-allowed' }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="new-email">New Email</label>
        <input
          id="new-email"
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
          placeholder="newemail@example.com"
          disabled={loading}
        />
      </div>

      {error && (
        <div className="error-message" style={{ marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{ 
          padding: '0.75rem', 
          background: '#dbeafe', 
          color: '#1e40af',
          borderRadius: 'var(--radius)',
          marginBottom: '1rem',
          fontSize: '0.9375rem'
        }}>
          <strong>Check your new email!</strong>
          <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>
            We've sent a confirmation link to {newEmail}. Click the link to confirm your new email address.
          </p>
        </div>
      )}

      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Email'}
        </button>
      </div>
    </form>
  )
}