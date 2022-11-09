import { Module } from '@nestjs/common'
import config from '@/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => config],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
