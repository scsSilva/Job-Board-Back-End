declare namespace Express {
  export interface Request {
    user?: {
      id: string
      role: 'USER' | 'RECRUITER'
    }
  }
}
