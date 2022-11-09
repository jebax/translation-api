import * as dotenv from 'dotenv'
import { Config } from './config.interface'

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

dotenv.config()

const config: Config = {
  deepL: {
    apiUrl: process.env.DEEPL_API_URL ?? '',
    authKey: process.env.DEEPL_AUTH_KEY ?? '',
  },
  port: parseInt(process.env.PORT, 10) || 3456,
}

export default config
