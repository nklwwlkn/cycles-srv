import { body } from 'express-validator'

export const updateMeValidator = [
  body('name').trim().notEmpty().withMessage('New name must be supplied.'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('New email must be supplied.')
    .isEmail()
    .withMessage('New email must have a correct email format.'),
]
