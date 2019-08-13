import { Router } from 'express'
import { PostMessage, GetMessages } from '../controllers/messageController'

const routes = Router()

routes.post('/message', PostMessage)
routes.get('/message', GetMessages)
export default routes
