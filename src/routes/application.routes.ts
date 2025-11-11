import { Router } from 'express'
import { applicationController } from '../controllers/application.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = Router()

router.post('/', authMiddleware, applicationController.apply)

router.get('/user/:userId', applicationController.getByUser)
router.get('/job/:jobId', applicationController.getByJob)
router.delete('/:id', authMiddleware, applicationController.delete)

export default router
