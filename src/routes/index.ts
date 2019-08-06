import { Router } from 'express'
import pessoaRouter from './pessoas'
import authenticationRoutes from './authenticationRoutes'
import postRoutes from './posts'
import comentarioRouter from './comentario'
const router = Router()

router.use(pessoaRouter)
router.use(authenticationRoutes)
router.use(postRoutes)
router.use(comentarioRouter)

export default router
