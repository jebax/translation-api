import { Controller, Get, Query } from '@nestjs/common'
import AppService from './app.service'

@Controller()
class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('translate')
  async getTranslation(
    @Query('text') text: string,
    @Query('locale') locale: string
  ): Promise<string> {
    return this.appService.getTranslation(text, locale)
  }
}

export default AppController
