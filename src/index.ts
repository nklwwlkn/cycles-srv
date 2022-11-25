import 'module-alias/register'
import * as dotenv from 'dotenv'
dotenv.config()

import { app } from './app'
import { ENV } from '@config/globals'

const bootstrap = async () => {
  console.log('Starting the server...')

  const { NODE_PORT, FIREBASE_API_KEY, JWT_KEY } = ENV

  if (!NODE_PORT) {
    throw new Error('PORT must be defined')
  }

  if (!FIREBASE_API_KEY) {
    throw new Error('FIREBASE_API_KEY must be defined')
  }

  if (!JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }

  const server = app.listen(NODE_PORT, () => {
    console.log(`Server is listening on PORT: ${NODE_PORT}`)
  })

  process.on('unhandledRejection', (err: Error) => {
    console.log('UNHANDLED REJECTION! Shutting down...')
    console.log(err.name, err.message)
    server.close(() => {
      process.exit(1)
    })
  })
}

bootstrap()
