import express, { Router } from 'express'

import {
  sendSmsValidator,
  verifySmsAndAuthValidator,
} from '@validators/authValidator'

import {
  getCurrentUser,
  sendSms,
  verifySmsAndAuth,
} from '@controllers/authController'

import { validateRequest, currentUser } from '@middlewares/.'

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
