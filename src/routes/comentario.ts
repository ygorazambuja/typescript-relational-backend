import { Router } from 'express'
import { adicionaComentario } from '../controllers/comentarioController'

const routes = Router()

routes.post('/posts/comentario', adicionaComentario)

export default routes
