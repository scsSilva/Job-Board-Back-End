import { Router } from 'express'
import userRoutes from './user.routes'
import authRoutes from './auth.routes'
import jobRoutes from './job.routes'
import applicationRoutes from './application.routes'

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/auth', authRoutes)
routes.use('/jobs', jobRoutes)
routes.use('/applications', applicationRoutes)

export default routes
