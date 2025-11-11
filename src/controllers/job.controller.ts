import { Request, Response } from 'express'
import { jobService } from '../services/job.service'
import { CreateJobDTO, UpdateJobDTO } from '../types/job.types'

export const jobController = {
  async create(req: Request, res: Response) {
    try {
      if (req.user?.role !== 'RECRUITER') {
        return res.status(403).json({ error: 'Only recruiters can create jobs.' })
      }

      const data: CreateJobDTO = { ...req.body, postedById: req.user?.id! }
      const job = await jobService.createJob(data)
      res.status(201).json(job)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message })
      }
      res.status(500).json({ error: 'Unexpected error while creating job.' })
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const { search } = req.query
      const jobs = await jobService.getAll(search as string)
      res.json(jobs)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message })
      }
      res.status(500).json({ error: 'Unexpected error while fetching jobs.' })
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const job = await jobService.getById(id)
      if (!job) {
        return res.status(404).json({ error: 'Job not found.' })
      }
      res.json(job)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message })
      }
      res.status(500).json({ error: 'Unexpected error while fetching job.' })
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const data: UpdateJobDTO = { ...req.body, user: req.user?.id }
      const job = await jobService.updateJob(id, data)
      res.json(job)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message })
      }
      res.status(500).json({ error: 'Unexpected error while updating job.' })
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      const user = req.user?.id!
      await jobService.deleteJob({ id, user })
      res.status(204).send()
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message })
      }
      res.status(500).json({ error: 'Unexpected error while deleting job.' })
    }
  },
}
