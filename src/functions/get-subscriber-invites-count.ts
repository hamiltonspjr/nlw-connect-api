import { redis } from '../redis/clientRedis'

interface GetSubscriberInvitesCountParams {
  subscriberId: string
}

// função que retorna a quantidade de convites que um inscrito fez
export async function getSubscriberInvitesCount({
  subscriberId,
}: GetSubscriberInvitesCountParams) {
  const count = await redis.zscore('referral:ranking', subscriberId)

  return {
    count: count ? Number.parseInt(count) : 0,
  }
}
