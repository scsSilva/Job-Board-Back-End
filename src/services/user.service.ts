import { prisma } from '../prisma/client'
import bcrypt from 'bcrypt'
import { CreateUserDTO } from '../types/user.types'

export const userService = {
  async createUser(data: CreateUserDTO) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (existingUser) throw new Error('Email is already registered.')

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role ?? 'USER',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })

    return newUser
  },

  async getAll() {
    return prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    })
  },

  async getById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: { jobs: true, applications: true },
    })
  },
}
