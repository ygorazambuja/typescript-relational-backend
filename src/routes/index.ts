import { Router } from 'express'
import pessoaRouter from './pessoas'
import authenticationRoutes from './authenticationRoutes'
import postRoutes from './posts'
import comentarioRouter from './comentario'
import messageRouter from './message'
const router = Router()

router.use(pessoaRouter)
router.use(authenticationRoutes)
router.use(postRoutes)
router.use(comentarioRouter)
router.use(messageRouter)

export default router
