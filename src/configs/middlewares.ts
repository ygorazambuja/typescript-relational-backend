import bodyParser from 'body-parser'
import cors from 'cors'
import { Router } from 'express'

const app = Router()
app.use(bodyParser.json())
app.use(cors())

export default app
