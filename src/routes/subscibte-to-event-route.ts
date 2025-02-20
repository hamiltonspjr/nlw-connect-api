import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { subscribeToEvent } from '../functions/subscribe-to-event'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Create a new subscription',
        tags: ['subscription'],
        body: z.object({
          name: z.string().min(2),
          email: z.string().email(),
          referrer: z.string().nullish(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, response) => {
      const { name, email, referrer } = request.body
      // criação da inscrição no banco de dados
      const { subscriberId } = await subscribeToEvent({
        name,
        email,
        referrerId: referrer,
      })
      return response.status(201).send({ subscriberId })
    }
  )
}
