import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const allowedOrigins = new Set([
    'http://localhost:5173',
    ...(process.env.CORS_ORIGINS?.split(',').map((value) => value.trim()) ??
      []),
  ])

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true)
        return
      }

      if (allowedOrigins.has(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true)
        return
      }

      callback(new Error('Not allowed by CORS'))
    },
  })
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
