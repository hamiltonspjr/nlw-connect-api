import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

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
        }),
        response: {
          201: z.object({
            name: z.string(),
            email: z.string(),
          }),
        },
      },
    },
    async (request, response) => {
      const { name, email } = request.body
      // criação da inscrição no banco de dados
      return response.status(201).send({ name, email })
    }
  )
}
