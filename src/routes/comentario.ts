import { Router } from 'express'
import {
  adicionaComentario,
  getComentariosDoPost
} from '../controllers/comentarioController'

const routes = Router()

routes.post('/posts/comentario', adicionaComentario)
routes.get('/posts/:id/comentarios', getComentariosDoPost)

export default routes
