import 'express-async-errors'
import express from 'express'
import { json } from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'

import { NotFoundError } from '@errors/NotFoundError'

import { errorHandler } from '@middlewares/errorHandler'

import { authRouter } from '@api/v1/routers/authRouter'
import { healthRouter } from '@api/v1/routers/healthRouter'
import { usersRouter } from '@api/v1/routers/usersRouter'

const app = express()

app.use(cors())
app.use(json())

app.use(morgan('dev'))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/health', healthRouter)
app.use('/api/v1/users', usersRouter)

app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
