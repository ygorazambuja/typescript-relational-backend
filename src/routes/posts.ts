import { Router } from 'express'
import {
  create,
  listaTodos,
  remove,
  listaPostsDoUsuario
} from '../controllers/postsControllers'
const routes = Router()

routes.post('/posts', create)
routes.get('/posts', listaTodos)
routes.delete('/posts/:id', remove)
routes.get('/pessoa/:id/posts', listaPostsDoUsuario)

export default routes
