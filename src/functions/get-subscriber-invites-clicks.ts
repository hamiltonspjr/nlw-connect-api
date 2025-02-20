import { redis } from '../redis/clientRedis'

interface GetSubscriberInviteClicksParams {
  subscriberId: string
}

export async function getSubscriberInviteClicks({
  subscriberId,
}: GetSubscriberInviteClicksParams) {
  const count = await redis.hget('referral:access_count', subscriberId)

  return {
    count: count ? Number.parseInt(count) : 0,
  }
}
