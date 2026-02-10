'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [signupSuccess, setSignupSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isLogin) {
        const { error, data } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        
        if (error) throw error

        // Check if this is their first login by checking if they have a profile
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', data.user.id)
          .single()

        // If profile was just created (less than 2 minutes old), send welcome email
        if (profile && profile.created_at) {
          const profileAge = Date.now() - new Date(profile.created_at).getTime()
          const twoMinutes = 2 * 60 * 1000
          
          if (profileAge < twoMinutes) {
            // Send welcome email
            try {
              await fetch('/api/welcome', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: data.user.email }),
              })
            } catch (emailError) {
              console.error('Welcome email error:', emailError)
            }
          }
        }

        router.push('/dashboard')
        router.refresh()
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        
        if (error) throw error
        
        // Show success message instead of auto-login
        setSignupSuccess(true)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (signupSuccess) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <div style={{ 
          fontSize: '3rem',
          marginBottom: '1rem'
        }}>
          ✉️
        </div>
        <h3 style={{ marginBottom: '1rem' }}>Check Your Email</h3>
        <p className="text-secondary">
          We've sent a confirmation link to <strong>{email}</strong>
        </p>
        <p className="text-secondary" style={{ marginTop: '1rem' }}>
          Click the link in the email to confirm your account and get started.
        </p>
        <button
          onClick={() => {
            setSignupSuccess(false)
            setIsLogin(true)
            setEmail('')
            setPassword('')
          }}
          className="btn btn-secondary"
          style={{ marginTop: '2rem' }}
        >
          Back to Sign In
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
          minLength={6}
          disabled={loading}
        />
      </div>

      {error && (
        <div className="error-message" style={{ marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <button 
        type="submit" 
        className="btn btn-primary" 
        style={{ width: '100%' }}
        disabled={loading}
      >
        {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
      </button>

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin)
            setError('')
          }}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'var(--primary)', 
            cursor: 'pointer',
            textDecoration: 'underline',
            fontSize: '0.9375rem'
          }}
          disabled={loading}
        >
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </button>
      </div>
    </form>
  )
}