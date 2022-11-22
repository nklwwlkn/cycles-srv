import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { identityToolkit } from '@config/googleIdentityToolkit'

import * as User from '@services/usersService'
import { ENV } from '@config/globals'

import { FirebaseAuthError } from '@errors/FirebaseAuthError'

export async function sendSms(req: Request, res: Response) {
  const { phoneNumber, recaptchaToken } = req.body
  let response

  try {
    response = await identityToolkit.relyingparty.sendVerificationCode({
      requestBody: {
        phoneNumber,
        recaptchaToken,
      },
    })

    res.send({
      sessionInfo: response.data.sessionInfo,
      phoneNumber: phoneNumber,
    })
  } catch (err) {
    console.log(err)
    throw new FirebaseAuthError(
      'Probably, you supplied incorrect phone number format.',
    )
  }
}

export async function verifySmsAndAuth(req: Request, res: Response) {
  const { code, sessionInfo, phoneNumber } = req.body

  try {
    await identityToolkit.relyingparty.verifyPhoneNumber({
      requestBody: {
        code: code,
        sessionInfo: sessionInfo,
      },
    })
  } catch (err) {
    console.log(err)
    throw new FirebaseAuthError('Incorrect code.')
  }

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
