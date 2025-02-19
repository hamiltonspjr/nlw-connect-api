import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '../env'
import { tableSubscriptions } from './schema/tableSubscriptions'

// conexão com o postgres
export const pg = postgres(env.POSTGRES_URL)
// conexão com o drizzle
export const db = drizzle(pg, {
  schema: {
    tableSubscriptions,
  },
})
