import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '1.5rem 0',
      margin: '4rem 0 0 0',
      background: 'var(--bg-secondary)'
    }}>
      <div className="container">
        <div className="footer-content" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}>
          <p className="text-secondary text-sm">
            © {new Date().getFullYear()} <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Placeholder</Link>. All rights reserved.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Link href="/contact" target="_blank" style={{ 
              color: 'var(--text-secondary)', 
              textDecoration: 'none',
              fontSize: '0.875rem'
            }}>
              Contact
            </Link>
            <Link href="/about" target="_blank" style={{ 
              color: 'var(--text-secondary)', 
              textDecoration: 'none',
              fontSize: '0.875rem'
            }}>
              About
            </Link>
            <Link href="/terms" target="_blank" style={{ 
              color: 'var(--text-secondary)', 
              textDecoration: 'none',
              fontSize: '0.875rem'
            }}>
              Terms
            </Link>
            <Link href="/privacy" target="_blank" style={{ 
              color: 'var(--text-secondary)', 
              textDecoration: 'none',
              fontSize: '0.875rem'
            }}>
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}