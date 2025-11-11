export interface LoginDTO {
  email: string
  password: string
}

export interface AuthResponseDTO {
  user: {
    id: string
    name: string
    email: string
    role: string
  }
  token: string
}
