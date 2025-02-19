import { Redis } from 'ioredis'
import { env } from '../env'

// conexão com o redis usando a lib ioredis
export const redis = new Redis(env.REDIS_URL)
