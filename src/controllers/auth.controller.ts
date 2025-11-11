import { Request, Response } from 'express'
import { authService } from '../services/auth.service'
import { LoginDTO } from '../types/auth.types'

export const authController = {
  async login(req: Request, res: Response) {
    try {
      const credentials: LoginDTO = req.body
      const result = await authService.login(credentials)
      res.json(result)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(401).json({ error: error.message })
      }
      res.status(500).json({ error: 'Unexpected error during authentication.' })
    }
  },
}
