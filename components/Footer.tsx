import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      marginTop: '4rem',
      padding: '1.5rem 0',
      background: 'var(--bg-secondary)'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <p className="text-secondary text-sm">
            © {new Date().getFullYear()} Placeholder. All rights reserved.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ 
              color: 'var(--text-secondary)', 
              textDecoration: 'none',
              fontSize: '0.875rem'
            }}>
              Contact
            </Link>
            <Link href="/about" style={{ 
              color: 'var(--text-secondary)', 
              textDecoration: 'none',
              fontSize: '0.875rem'
            }}>
              About
            </Link>
            <Link href="/terms" style={{ 
              color: 'var(--text-secondary)', 
              textDecoration: 'none',
              fontSize: '0.875rem'
            }}>
              Terms
            </Link>
            <Link href="/privacy" style={{ 
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