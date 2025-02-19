import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

// criando a referência da table subscriptions
export const tableSubscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
