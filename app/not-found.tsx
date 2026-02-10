import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-sm" style={{ paddingTop: '4rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ marginBottom: '1rem' }}>Project Not Found</h2>
      <p className="text-secondary" style={{ marginBottom: '2rem' }}>
        This status page doesn't exist or has been removed.
      </p>
      <Link href="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  )
}