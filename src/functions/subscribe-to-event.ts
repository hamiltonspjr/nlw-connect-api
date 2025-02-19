import { db } from '../drizzle/clientDrizzle'
import { tableSubscriptions } from '../drizzle/schema/tableSubscriptions'

interface SubscribeToEventParams {
  name: string
  email: string
}

export async function subscribeToEvent({
  name,
  email,
}: SubscribeToEventParams) {
  // adicionando um usuário no banco
  const result = await db
    .insert(tableSubscriptions)
    .values({
      name,
      email,
    })
    .returning()
  // retornando o id do usuário
  const subscriber = result[0]
  return {
    subscriberId: subscriber.id,
  }
}
