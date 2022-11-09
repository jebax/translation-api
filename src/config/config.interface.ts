interface DeepLConfig {
  apiUrl: string
  authKey: string
}

interface Config {
  port: number
  deepL: DeepLConfig
}

export type { Config, DeepLConfig }
