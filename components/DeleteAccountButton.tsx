'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface DeleteAccountButtonProps {
  userId: string
}

export default function DeleteAccountButton({ userId }: DeleteAccountButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleDelete = async () => {
    if (confirmText !== 'DELETE') {
      setError('Please type DELETE to confirm')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Delete the user's account
      const { error } = await supabase.auth.admin.deleteUser(userId)

      if (error) throw error

      // Sign out and redirect
      await supabase.auth.signOut()
      router.push('/')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to delete account')
      setLoading(false)
    }
  }

  if (!showConfirm) {
    return (
      <button
        onClick={() => setShowConfirm(true)}
        className="btn btn-danger"
      >
        Delete Account
      </button>
    )
  }

  return (
    <div>
      <p style={{ marginBottom: '1rem' }}>
        Type <strong>DELETE</strong> to confirm account deletion:
      </p>
      <div className="form-group">
        <input
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="Type DELETE"
          disabled={loading}
        />
      </div>
      {error && (
        <div className="error-message" style={{ marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      <div className="flex gap-2">
        <button
          onClick={handleDelete}
          className="btn btn-danger"
          disabled={loading || confirmText !== 'DELETE'}
        >
          {loading ? 'Deleting...' : 'Confirm Delete Account'}
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