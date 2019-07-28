import express from 'express'
import mainRouter from './routes'
import middlewares from './configs/middlewares'
const app = express()

app.use(middlewares)
app.use(mainRouter)

const server = app.listen(3000, () => {})

export default server
