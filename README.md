# cycles-srv

## Required envs:

- PORT=5001
- NODE_ENV=development
- FIREBASE_API_KEY=Your firebase API key
- DATABASE_URL=PostgreSQL URL
- JWT_KEY=Your generated JWT key

## Development:

1. Clone the repo.
2. Run `npm install`
3. Build the service `npm run build`
4. Run the PostgreSQL using `docker-compose up`
5. Run the migrations `npx prisma migrate dev`
6. Run the service `npm run start`

## Frontend URL:

https://capable-syrniki-9d1444.netlify.app/
