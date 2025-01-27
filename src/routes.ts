import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserController } from './controller/CreateUserController'
import { LoginUserController } from './controller/LoginUserController'

export function routes(fastify: FastifyInstance) {
  fastify.post(
    '/create-account',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateUserController().handle(request, reply)
    }
  )

  fastify.post(
    '/login',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new LoginUserController().handle(request, reply)
    }
  )
}
