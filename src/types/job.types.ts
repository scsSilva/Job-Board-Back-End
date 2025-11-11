export interface CreateJobDTO {
  title: string
  description: string
  salary: number
  typeLocation?: 'REMOTE' | 'ONSITE' | 'HYBRID'
  postedById: string
}

export interface UpdateJobDTO {
  title?: string
  description?: string
  salary?: number
  typeLocation?: "REMOTE" | "ONSITE" | "HYBRID",
  user: string
}

export interface DeleteJobDTO {
  id: string;
  user: string;
}