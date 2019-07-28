import { Router } from 'express'
import { Adiciona, BuscaTodos, Remove } from '../controllers/pessoasController'

const routes = Router()

routes.post('/pessoa', Adiciona)
routes.get('/pessoa', BuscaTodos)
routes.delete('/pessoa/:id', Remove)

export default routes
