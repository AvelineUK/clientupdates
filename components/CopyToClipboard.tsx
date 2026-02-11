'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyToClipboardProps {
  text: string
}

export default function CopyToClipboard({ text }: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="btn btn-secondary"
      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
    >
      {copied ? (
        <>
          <Check size={16} />
          Copied!
        </>
      ) : (
        <>
          <Copy size={16} />
          Copy Link
        </>
      )}
    </button>
  )
}