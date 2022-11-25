import express, { Router } from 'express'

import { requireAuth, currentUser, validateRequest } from '@middlewares/.'
import { getMe, updateMe } from '@controllers/usersController'
import { updateMeValidator } from '@validators/usersValidator'

const usersRouter: Router = express.Router()

usersRouter.use(currentUser)
usersRouter.get('/me', requireAuth, getMe)
usersRouter.patch(
  '/me',
  updateMeValidator,
  validateRequest,
  requireAuth,
  updateMe,
)

export { usersRouter }
