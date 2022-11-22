import express, { Router } from 'express'

import { requireAuth } from '@middlewares/requireAuth'
import { getMe, updateMe } from '@controllers/usersController'
import { currentUser } from '@middlewares/currentUser'
import { updateMeValidator } from '@validators/usersValidator'
import { validateRequest } from '@middlewares/requestValidator'

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
