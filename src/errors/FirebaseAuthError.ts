import { CustomError } from '@errors/CustomError'

export class FirebaseAuthError extends CustomError {
  statusCode = 400

  constructor(message: string) {
    super(message)

    Object.setPrototypeOf(this, FirebaseAuthError.prototype)
  }

  serializeErrors() {
    return [{ message: this.message }]
  }
}
