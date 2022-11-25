import { identityToolkit } from '@config/googleIdentityToolkit'
import { FirebaseAuthError } from '@errors/FirebaseAuthError'

type SendSmsPayload = {
  phoneNumber: string
  recaptchaToken: string
}

type VerifySmsPayload = {
  code: string
  sessionInfo: string
}

export async function sendVerificationSms(payload: SendSmsPayload) {
  const { phoneNumber, recaptchaToken } = payload

  try {
    const response = await identityToolkit.relyingparty.sendVerificationCode({
      requestBody: {
        phoneNumber,
        recaptchaToken,
      },
    })

    return response.data.sessionInfo
  } catch (err) {
    console.log(err)

    throw new FirebaseAuthError(
      'Something went wrong with a third-party authentication provider.',
    )
  }
}

export async function verifySmsCode(payload: VerifySmsPayload) {
  const { code, sessionInfo } = payload

  try {
    const response = await identityToolkit.relyingparty.verifyPhoneNumber({
      requestBody: {
        code: code,
        sessionInfo: sessionInfo,
      },
    })
    return response.data
  } catch (err) {
    console.log(err)

    throw new FirebaseAuthError('Incorrect code supplied.')
  }
}
