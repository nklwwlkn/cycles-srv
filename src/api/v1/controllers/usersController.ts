import { Request, Response } from 'express'

import * as User from '@services/usersService'

export async function getMe(req: Request, res: Response) {
  const { phoneNumber } = req.currentUser!

  const user = await User.findByPhoneNumber(phoneNumber)

  res.send(user)
}

export async function updateMe(req: Request, res: Response) {
  const { phoneNumber } = req.currentUser!
  const { email, name } = req.body

  const user = await User.updateByPhoneNumber(phoneNumber, {
    email: email,
    name: name,
  })

  res.send(user)
}
