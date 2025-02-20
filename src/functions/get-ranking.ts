// função que retorna os 3 primeiros colocados do ranking

import { inArray } from 'drizzle-orm'
import { db } from '../drizzle/clientDrizzle'
import { tableSubscriptions } from '../drizzle/schema/tableSubscriptions'
import { redis } from '../redis/clientRedis'

export async function getRanking() {
  const ranking = await redis.zrevrange('referral:ranking', 0, 2, 'WITHSCORES')
  const subscriberIdAndScore: Record<string, number> = {}

  for (let i = 0; i < ranking.length; i += 2) {
    subscriberIdAndScore[ranking[i]] = Number.parseInt(ranking[i + 1])
  }

  const subscribers = await db
    .select()
    .from(tableSubscriptions)
    .where(inArray(tableSubscriptions.id, Object.keys(subscriberIdAndScore)))

  const rankingWithScore = subscribers
    .map(subscriber => {
      return {
        id: subscriber.id,
        name: subscriber.name,
        score: subscriberIdAndScore[subscriber.id],
      }
    })
    .sort((sub1, sub2) => sub2.score - sub1.score)

  return {
    rankingWithScore,
  }
}
