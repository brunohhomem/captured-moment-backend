import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserController } from './controller/Auth/CreateUserController'
import { LoginUserController } from './controller/Auth/LoginUserController'
import { authenticateToken } from './middleware/authenticateToken'
import { GetUserController } from './controller/Auth/GetUserController'
import { AddMomentsController } from './controller/Moments/AddMomentsController'
import { GetAllMomentsController } from './controller/Moments/GetAllMomentsController'

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

  //Add moments
  fastify.post(
    '/add-registered-moment',
    { preHandler: authenticateToken },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new AddMomentsController().handle(request, reply)
    }
  )

  //Busca momentos do usuário
  fastify.get(
    '/get-all-moments',
    { preHandler: authenticateToken },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new GetAllMomentsController().handle(request, reply)
    }
  )
}
