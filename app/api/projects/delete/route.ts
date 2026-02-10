import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { projectId } = await request.json()

    if (!projectId) {
      throw new Error('Project ID is required')
    }

    // Delete files from storage
    const { data: files } = await supabase.storage
      .from('project-files')
      .list(projectId)

    if (files && files.length > 0) {
      const filePaths = files.map(file => `${projectId}/${file.name}`)
      await supabase.storage
        .from('project-files')
        .remove(filePaths)
    }

    // Delete project (cascade will delete updates and views)
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId)

    if (error) {
      throw new Error(`Failed to delete project: ${error.message}`)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete project' },
      { status: 500 }
    )
  }
}