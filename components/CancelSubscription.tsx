'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface CancelSubscriptionProps {
  userId: string
}

export default function CancelSubscription({ userId }: CancelSubscriptionProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleCancel = async () => {
    setLoading(true)
    setError('')

    try {
      // This would call Stripe to cancel the subscription
      // For now, just a placeholder
      alert('Stripe integration not yet active. This will cancel your subscription when connected.')
      setShowConfirm(false)
    } catch (err: any) {
      setError(err.message || 'Failed to cancel subscription')
    } finally {
      setLoading(false)
    }
  }

  if (!showConfirm) {
    return (
      <div className="form-actions">
        <button
          onClick={() => setShowConfirm(true)}
          className="btn btn-danger"
        >
          Cancel Subscription
        </button>
      </div>
    )
  }

  return (
    <div>
      <p style={{ marginBottom: '1rem' }}>
        Are you sure you want to cancel your Pro subscription? You'll lose access to:
      </p>
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
        <li className="text-secondary" style={{ marginBottom: '0.5rem' }}>Unlimited projects</li>
        <li className="text-secondary" style={{ marginBottom: '0.5rem' }}>Custom branding</li>
        <li className="text-secondary" style={{ marginBottom: '0.5rem' }}>File attachments</li>
      </ul>
      <p className="text-secondary text-sm" style={{ marginBottom: '1rem' }}>
        Your subscription will remain active until the end of your current billing period.
      </p>
      {error && (
        <div className="error-message" style={{ marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      <div className="form-actions">
        <button
          onClick={handleCancel}
          className="btn btn-danger"
          disabled={loading}
        >
          {loading ? 'Cancelling...' : 'Yes, Cancel Subscription'}
        </button>
        <button
          onClick={() => {
            setShowConfirm(false)
            setError('')
          }}
          className="btn btn-secondary"
          disabled={loading}
        >
          Keep Pro
        </button>
      </div>
    </div>
  )
}