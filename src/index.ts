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

  app.listen(NODE_PORT, () => {
    console.log(`Server is listening on PORT: ${NODE_PORT}`)
  })
}

bootstrap()
