type EnvConfig = {
  NODE_ENV: string | undefined
  NODE_PORT: number | string | undefined
  FIREBASE_API_KEY: string | undefined
  JWT_KEY: string | undefined
}

export const ENV: EnvConfig = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  NODE_PORT: process.env.NODE_PORT || process.env.PORT || 5000,
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  JWT_KEY: process.env.JWT_KEY,
}
