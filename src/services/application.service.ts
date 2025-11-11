import { prisma } from '../prisma/client'
import { CreateApplicationDTO } from '../types/application.types'

export const applicationService = {
  async apply(data: CreateApplicationDTO) {
    const existing = await prisma.application.findFirst({
      where: { userId: data.userId, jobId: data.jobId },
    })

    if (existing) {
      throw new Error('You have already applied for this job.')
    }

    return prisma.application.create({
      data: { userId: data.userId, jobId: data.jobId },
    })
  },

  async getByUser(userId: string) {
    return prisma.application.findMany({
      where: { userId },
      include: { job: true },
    })
  },

  async getByJob(jobId: string) {
    return prisma.application.findMany({
      where: { jobId },
      include: { user: true },
    })
  },

  async deleteApplication(id: string) {
    return prisma.application.delete({ where: { id } })
  },
}
