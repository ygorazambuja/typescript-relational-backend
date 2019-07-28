import { Router } from 'express'
import { signin } from '../controllers/authentications'
import { Adiciona } from '../controllers/pessoasController'

const routes = Router()

routes.post('/signin', signin)
routes.post('/signup', Adiciona)

export default routes
