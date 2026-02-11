import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AuthForm from '@/components/AuthForm'

export default async function AuthPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  // If user is logged in, redirect to dashboard
  if (user) {
    redirect('/dashboard')
  }

  return (
    <div>
      {/* Simple Navbar */}
      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            <Link href="/" className="logo">
              Placeholder
            </Link>
          </div>
        </div>
      </nav>

      {/* Auth Form */}
      <div className="container-sm" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ marginBottom: '0.5rem' }}>Welcome to Placeholder</h1>
          <p className="text-secondary">Sign in to your account or create a new one</p>
        </div>
        
        <div className="card" style={{ maxWidth: '450px', margin: '0 auto' }}>
          <AuthForm />
        </div>
      </div>
    </div>
  )
}