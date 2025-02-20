import { eq } from 'drizzle-orm'
import { db } from '../drizzle/clientDrizzle'
import { tableSubscriptions } from '../drizzle/schema/tableSubscriptions'
import { redis } from '../redis/clientRedis'

interface SubscribeToEventParams {
  name: string
  email: string
  referrerId?: string | null
}

export async function subscribeToEvent({
  name,
  email,
  referrerId,
}: SubscribeToEventParams) {
  // validação do email do usuário para verificar se ele já está cadastrado
  const subscribers = await db
    .select()
    .from(tableSubscriptions)
    .where(eq(tableSubscriptions.email, email))

  if (subscribers.length > 0) {
    return {
      subscriberId: subscribers[0].id,
    }
  }

  // adicionando um usuário no banco
  const result = await db
    .insert(tableSubscriptions)
    .values({
      name,
      email,
    })
    .returning()
  // verificando se o usuário vem de uma indicação
  if (referrerId) {
    await redis.zincrby('referral:ranking', 1, referrerId)
  }

  // retornando o id do usuário
  const subscriber = result[0]
  return {
    subscriberId: subscriber.id,
  }
}
