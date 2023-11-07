import express, { json } from 'express'
import morgan from 'morgan'

// import routes
import { userRouter } from './src/routes/user.js'

const PORT = 3001
const app = express()

app.use(json())
app.disable('x-powered-by')
app.use(morgan('dev'))

app.use('/', userRouter)

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`)
})
