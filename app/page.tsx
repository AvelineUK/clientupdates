import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AuthForm from '@/components/AuthForm'
import { LayoutGrid, Mail, Eye, Palette, Paperclip, Zap } from 'lucide-react'

export default async function Home() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  // If user is logged in, redirect to dashboard
  if (user) {
    redirect('/dashboard')
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            <Link href="/" className="logo">
              Placeholder
            </Link>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <Link href="#features" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>
                Features
              </Link>
              <Link href="#pricing" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>
                Pricing
              </Link>
              <Link href="/auth" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <div className="container hero-container">
          <h1 className="hero-title">
            Keep your clients <span className="accent-text">updated</span> without the email chaos
          </h1>
          <p className="hero-subtitle">
            Simple project status pages for freelancers, designers, and consultants. No login required for clients.
          </p>
          <div className="hero-cta">
            <Link href="/auth" className="btn btn-primary">
              Get Started Free
            </Link>
            <Link href="#features" className="btn btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </div>

    {/* Features Section */}
      <div id="features" className="container section">
        <h2 className="section-title">
          Everything you need, nothing you don't
        </h2>
        
        <div className="features-grid">
          <div className="card">
            <div className="feature-icon"><LayoutGrid size={40} strokeWidth={1.5} /></div>
            <h3 className="feature-title">Simple Status Pages</h3>
            <p className="text-secondary">
              Each project gets a unique URL. Share it with your client—no login, no hassle.
            </p>
          </div>

          <div className="card">
            <div className="feature-icon"><Mail size={40} strokeWidth={1.5} /></div>
            <h3 className="feature-title">Automatic Notifications</h3>
            <p className="text-secondary">
              Post an update, and your client gets notified instantly. Stay in sync effortlessly.
            </p>
          </div>

          <div className="card">
            <div className="feature-icon"><Eye size={40} strokeWidth={1.5} /></div>
            <h3 className="feature-title">View Tracking</h3>
            <p className="text-secondary">
              See when your client checks the status page. No more wondering if they saw your update.
            </p>
          </div>

          <div className="card">
            <div className="feature-icon"><Palette size={40} strokeWidth={1.5} /></div>
            <h3 className="feature-title">Custom Branding</h3>
            <p className="text-secondary">
              Add your logo and colors to status pages. Make it yours with Pro.
            </p>
          </div>

          <div className="card">
            <div className="feature-icon"><Paperclip size={40} strokeWidth={1.5} /></div>
            <h3 className="feature-title">File Attachments</h3>
            <p className="text-secondary">
              Share mockups, documents, or deliverables right in your updates.
            </p>
          </div>

          <div className="card">
            <div className="feature-icon"><Zap size={40} strokeWidth={1.5} /></div>
            <h3 className="feature-title">No Client Login</h3>
            <p className="text-secondary">
              Your clients just click a link. No accounts, no passwords, no friction.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="section section-alt">
        <div className="container">
          <h2 className="section-title">How it works</h2>
          
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3 className="step-title">Create a Project</h3>
              <p className="text-secondary">
                Add your project name and client email. They'll get a unique status page link.
              </p>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <h3 className="step-title">Post Updates</h3>
              <p className="text-secondary">
                Write your update, add a status badge, attach files. Your client gets notified.
              </p>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <h3 className="step-title">Stay In Sync</h3>
              <p className="text-secondary">
                See when they view updates. Keep everyone on the same page, effortlessly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Preview */}
      <div id="pricing"></div>
      <div className="container section">
        <h2 className="section-title">Simple, transparent pricing</h2>
        <p className="section-subtitle">
          Start free. Upgrade when you're ready.
        </p>
        
        <div className="pricing-grid">
          <div className="card pricing-card">
            <h3 className="pricing-title">Free</h3>
            <div className="pricing-price">
              $0<span className="pricing-period">/month</span>
            </div>
            <ul className="pricing-features">
              <li>✓ 3 projects</li>
              <li>✓ Unlimited updates</li>
              <li>✓ Email notifications</li>
            </ul>
          </div>

          <div className="card pricing-card popular">
            <div className="pricing-badge">POPULAR</div>
            <h3 className="pricing-title">Pro</h3>
            <div className="pricing-price">
              $12<span className="pricing-period">/month</span>
            </div>
            <ul className="pricing-features">
              <li>✓ Unlimited projects</li>
              <li>✓ Unlimited updates</li>
              <li>✓ Email notifications</li>
              <li>✓ File attachments</li>
              <li>✓ Custom branding</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Signup Section */}
      <div id="signup" className="section section-alt">
        <div className="container-sm">
          <h2 className="section-title">Ready to get started?</h2>
          <p className="section-subtitle">
            Create your account and start keeping clients updated in minutes.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <Link href="/auth" className="btn btn-primary" style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}