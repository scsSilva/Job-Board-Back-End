import { Request, Response } from 'express'
import { applicationService } from '../services/application.service'
import { CreateApplicationDTO } from '../types/application.types'

export const applicationController = {
  async apply(req: Request, res: Response) {
    try {
      const data: CreateApplicationDTO = req.body
      const application = await applicationService.apply(data)
      res.status(201).json(application)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message })
      }
      res.status(500).json({ error: 'Unexpected error while applying for job.' })
    }
  },

  async getByUser(req: Request, res: Response) {
    try {
      const { userId } = req.params
      const applications = await applicationService.getByUser(userId)
      res.json(applications)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message })
      }
      res.status(500).json({ error: 'Unexpected error while fetching user applications.' })
    }
  },

  async getByJob(req: Request, res: Response) {
    try {
      const { jobId } = req.params
      const applications = await applicationService.getByJob(jobId)
      res.json(applications)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message })
      }
      res.status(500).json({ error: 'Unexpected error while fetching job applications.' })
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      await applicationService.deleteApplication(id)
      res.status(204).send()
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message })
      }
      res.status(500).json({ error: 'Unexpected error while deleting application.' })
    }
  },
}
