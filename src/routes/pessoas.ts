import { Router } from 'express'
import { Adiciona, BuscaTodos, remove } from '../controllers/pessoasController'

const routes = Router()

routes.post('/pessoa', Adiciona)
routes.get('/pessoa', BuscaTodos)
routes.delete('/pessoa/:id', remove)

export default routes
