import { Router } from 'express'
import { jobController } from '../controllers/job.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = Router()

router.get('/', authMiddleware, jobController.getAll)
router.get('/:id', authMiddleware, jobController.getById)

router.post('/', authMiddleware, jobController.create)
router.put('/:id', authMiddleware, jobController.update)
router.delete('/:id', authMiddleware, jobController.delete)

export default router
