import express, { Router } from 'express'

import { check } from '@controllers/healthController'

const healthRouter: Router = express.Router()

healthRouter.get('/check', check)

export { healthRouter }
