import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { AxiosError } from 'axios'
import { map, catchError, firstValueFrom } from 'rxjs'
import { DeepLConfig } from '@/config/config.interface'
import TranslationResponse from './interfaces/translation-response'

@Injectable()
class AppService {
  private readonly deepLConfig: DeepLConfig

  constructor(
    configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    this.deepLConfig = configService.get('deepL')
  }

  async getTranslation(text: string, locale: string): Promise<string> {
    const decodedText = decodeURIComponent(text)
    const paragraphs = decodedText
      .split('\n')
      .map((paragraph) => `text=${encodeURIComponent(paragraph)}&`)
      .join('')

    return firstValueFrom(
      this.httpService
        .get<TranslationResponse>(
          `${this.deepLConfig.apiUrl}/v2/translate?${paragraphs}&target_lang=${locale}`,
          {
            headers: {
              Authorization: `DeepL-Auth-Key ${this.deepLConfig.authKey}`,
            },
          }
        )
        .pipe(
          map((res) => res.data),
          map((translations) =>
            translations.translations
              ?.map((translation) => translation.text)
              .join('\n')
          )
        )
        .pipe(
          catchError((error: AxiosError) => {
            // eslint-disable-next-line no-console
            console.error(error.response.data)
            return text
          })
        )
    )
  }
}

export default AppService
