import { prisma } from '../prisma/client'
import { CreateJobDTO, DeleteJobDTO, UpdateJobDTO } from '../types/job.types'

export const jobService = {
  async createJob(data: CreateJobDTO) {
    return prisma.job.create({
      data: {
        title: data.title,
        description: data.description,
        salary: data.salary,
        typeLocation: data.typeLocation ?? 'REMOTE',
        postedById: data.postedById,
      },
    })
  },

  async getAll(search?: string) {
    return prisma.job.findMany({
      where: search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {},
      include: {
        postedBy: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        applications: true,
      },
      orderBy: { createdAt: 'desc' },
    })
  },

  async getById(id: string) {
    return prisma.job.findUnique({
      where: { id },
      include: {
        postedBy: true,
        applications: { include: { user: true } },
      },
    })
  },

  async updateJob(id: string, data: UpdateJobDTO) {
    const job = await prisma.job.findUnique({ where: { id } })
    if (!job) throw new Error('Job not found.')

    if (job.postedById !== data.user) {
      throw new Error('You do not have permission to update this job.')
    }

    const updateData: any = {
      title: data.title,
      description: data.description,
      salary: Number(data.salary),
      typeLocation: data.typeLocation,
    }

    return prisma.job.update({ where: { id }, data: updateData })
  },

  async deleteJob(data: DeleteJobDTO) {
    const job = await prisma.job.findUnique({ where: { id: data.id } })
    if (!job) throw new Error('Job not found.')

    if (job.postedById !== data.user) {
      throw new Error('You do not have permission to delete this job.')
    }

    return prisma.job.delete({ where: { id: data.id } })
  },
}
