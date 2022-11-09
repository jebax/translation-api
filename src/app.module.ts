import { Module } from '@nestjs/common'
import config from '@/config'
import { ConfigModule } from '@nestjs/config'
import { HttpModule } from '@nestjs/axios'
import AppController from './app.controller'
import AppService from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => config],
    }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
