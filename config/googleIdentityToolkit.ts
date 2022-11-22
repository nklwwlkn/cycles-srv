import { identitytoolkit } from '@googleapis/identitytoolkit'

import { ENV } from './globals'

export const identityToolkit = identitytoolkit({
  auth: ENV.FIREBASE_API_KEY,
  version: 'v3',
})
