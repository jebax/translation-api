import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import AppModule from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  const port = app.get(ConfigService).get('port')

  await app.listen(port)
}
bootstrap()
