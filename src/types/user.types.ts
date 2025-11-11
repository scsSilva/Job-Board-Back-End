export interface CreateUserDTO {
  name: string
  email: string
  password: string
  role?: "USER" | "RECRUITER"
}

export interface LoginUserDTO {
  email: string
  password: string
}
