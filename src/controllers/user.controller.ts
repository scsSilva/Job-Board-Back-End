import { Request, Response } from 'express'
import { userService } from '../services/user.service'
import { CreateUserDTO } from '../types/user.types'

export const userController = {
  async register(req: Request, res: Response) {
    try {
      const data: CreateUserDTO = req.body
      const user = await userService.createUser(data)
      res.status(201).json(user)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message })
      }
      res.status(500).json({ error: 'Unexpected error while registering user.' })
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const users = await userService.getAll()
      res.json(users)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message })
      }
      res.status(500).json({ error: 'Unexpected error while fetching users.' })
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const user = await userService.getById(id)
      if (!user) {
        return res.status(404).json({ error: 'User not found.' })
      }
      res.json(user)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message })
      }
      res.status(500).json({ error: 'Unexpected error while fetching user.' })
    }
  },
}
