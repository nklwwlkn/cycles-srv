import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

type UserPayload = {
  phoneNumber: string
}

declare global {
  namespace Express {
    interface Request {
      currentUser: UserPayload | null
    }
  }
}

export const currentUser = (req: Request, _: Response, next: NextFunction) => {
  let token: string | undefined

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    req.currentUser = null
    return next()
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_KEY!) as UserPayload
    req.currentUser = payload
  } catch (err) {}

  next()
}
