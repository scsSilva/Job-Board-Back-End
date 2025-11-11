import { prisma } from '../prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { LoginDTO } from '../types/auth.types'

export const authService = {
  async login({ email, password }: LoginDTO) {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) throw new Error('User not found.')

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('Invalid password.')

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    )

    const { password: _, ...userWithoutPassword } = user
    return { user: userWithoutPassword, token }
  },
}
