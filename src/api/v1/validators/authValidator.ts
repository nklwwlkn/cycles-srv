import { body } from 'express-validator'

export const sendSmsValidator = [
  body('phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Mobile phone number must be supplied.'),
  body('recaptchaToken')
    .trim()
    .notEmpty()
    .withMessage('Oops. Retry your captcha.'),
]

export const verifySmsAndAuthValidator = [
  body('code')
    .trim()
    .notEmpty()
    .withMessage('Verification code must be supplied.')
    .isLength({
      min: 6,
      max: 6,
    })
    .withMessage('Invalid code.'),
  body('sessionInfo')
    .notEmpty()
    .withMessage('Please, try to log in once again'),
]
