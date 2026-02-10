import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AuthForm from '@/components/AuthForm'

export default async function Home() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  // If user is logged in, redirect to dashboard
  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="container-sm" style={{ paddingTop: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          <span style={{ color: 'var(--primary)' }}>Placeholder</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
          Keep your clients updated without the email chaos
        </p>
      </div>

      <div className="card" style={{ maxWidth: '450px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Get Started</h2>
        <AuthForm />
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text-secondary)' }}>
        <p>Simple project status updates for freelancers, designers, and consultants.</p>
      </div>
    </div>
  )
}