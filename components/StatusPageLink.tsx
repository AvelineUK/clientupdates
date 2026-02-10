'use client'

interface StatusPageLinkProps {
  statusPageUrl: string
  lastViewed?: string
}

export default function StatusPageLink({ statusPageUrl, lastViewed }: StatusPageLinkProps) {
  return (
    <div className="card" style={{ background: 'var(--bg-secondary)' }}>
      <h3 style={{ marginBottom: '0.5rem' }}>Client Status Page</h3>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={statusPageUrl}
          readOnly
          style={{ 
            flex: 1, 
            background: 'white',
            cursor: 'text'
          }}
          onClick={(e) => e.currentTarget.select()}
        />
        <button
          className="btn btn-secondary"
          onClick={() => {
            navigator.clipboard.writeText(statusPageUrl)
          }}
        >
          Copy
        </button>
        
          <a href={statusPageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          Preview
        </a>
      </div>
      {lastViewed && (
        <p className="text-sm" style={{ marginTop: '0.75rem', color: 'var(--success)' }}>
          ✓ Last viewed: {lastViewed}
        </p>
      )}
    </div>
  )
}