'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function ConditionalFooter() {
  const pathname = usePathname()
  
  // Hide footer on status pages
  if (pathname?.startsWith('/status/')) {
    return null
  }
  
  return <Footer />
}