import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import * as User from '@services/usersService'
import { ENV } from '@config/globals'

import * as Sms from '@services/auth/firebase/smsService'

export async function sendSms(req: Request, res: Response) {
  const { phoneNumber, recaptchaToken } = req.body

  const sessionInfo = await Sms.sendVerificationSms({
    phoneNumber,
    recaptchaToken,
  })

  res.send({
    sessionInfo: sessionInfo,
    phoneNumber: phoneNumber,
  })
}

export async function verifySmsAndAuth(req: Request, res: Response) {
  const { code, sessionInfo, phoneNumber } = req.body

  await Sms.verifySmsCode({ code, sessionInfo })

  let user = await User.findByPhoneNumber(phoneNumber)

  if (!user) {
    user = await User.create(phoneNumber)
  }

  const userJwt = jwt.sign(
    {
      phoneNumber: user.phoneNumber,
    },
    ENV.JWT_KEY!,
  )

  res.status(201).send({ jwt: userJwt })
}

export async function getCurrentUser(req: Request, res: Response) {
  res.send({ currentUser: req.currentUser || null })
}
