'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface ViewTrackerProps {
  projectId: string
}

export default function ViewTracker({ projectId }: ViewTrackerProps) {
  useEffect(() => {
    const trackView = async () => {
      const supabase = createClient()
      
      // Insert a new view record
      await supabase
        .from('project_views')
        .insert({
          project_id: projectId,
        })
    }

    trackView()
  }, [projectId])

  return null // This component doesn't render anything
}