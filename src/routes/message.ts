import { Router } from 'express'
import {
  PostMessage,
  GetMessages,
  GetMessageById
} from '../controllers/messageController'

const routes = Router()

routes.post('/message', PostMessage)
routes.get('/message', GetMessages)
routes.get('/message/:id', GetMessageById)
export default routes
