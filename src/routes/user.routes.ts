import { Router } from 'express'
import { userController } from '../controllers/user.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = Router()

router.post('/', userController.register)
router.get('/', authMiddleware, userController.getAll)
router.get('/:id', authMiddleware, userController.getById)

export default router
