import { Router } from 'express'
import pessoaRouter from './pessoas'
import authenticationRoutes from './authenticationRoutes'

const router = Router()

router.use(pessoaRouter)
router.use(authenticationRoutes)

export default router
