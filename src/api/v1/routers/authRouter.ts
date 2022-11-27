import express, { Router } from 'express'

import { validateRequest, currentUser } from '@middlewares/.'

import {
  sendSmsValidator,
  verifySmsAndAuthValidator,
} from '@validators/authValidator'

import {
  getCurrentUser,
  sendSms,
  verifySmsAndAuth,
} from '@controllers/authController'

const authRouter: Router = express.Router()

authRouter.post('/strategies/sms', sendSmsValidator, validateRequest, sendSms)
authRouter.post(
  '/strategies/sms/verify',
  verifySmsAndAuthValidator,
  validateRequest,
  verifySmsAndAuth,
)

authRouter.get('/current-user', currentUser, getCurrentUser)

export { authRouter }
