export interface Project {
  id: string
  user_id: string
  name: string
  client_email: string
  created_at: string
  updated_at: string
}

export interface Update {
  id: string
  project_id: string
  message: string
  status: string | null
  file_url: string | null
  file_name: string | null
  created_at: string
}

export interface ProjectView {
  id: string
  project_id: string
  viewed_at: string
}

export interface ProjectWithUpdates extends Project {
  updates: Update[]
  last_view?: string
}