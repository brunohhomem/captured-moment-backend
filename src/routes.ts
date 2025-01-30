import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserController } from './controller/CreateUserController'
import { LoginUserController } from './controller/LoginUserController'
import { authenticateToken } from './app'
import { GetUserController } from './controller/GetUserController'

export function routes(fastify: FastifyInstance) {
  //Criar conta
  fastify.post(
    '/create-account',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateUserController().handle(request, reply)
    }
  )

  //Login de usuário
  fastify.post(
    '/login',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new LoginUserController().handle(request, reply)
    }
  )

  //Busca de usuário
  fastify.get(
    '/get-user',
    { preHandler: authenticateToken },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new GetUserController().handle(request, reply)
    }
  )
}
