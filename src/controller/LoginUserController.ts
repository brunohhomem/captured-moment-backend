import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserService } from '../service/CreateUserService'
import { LoginUserService } from '../service/LoginUserService'

class LoginUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as {
      email: string
      password: string
    }

    if (!email || !password) {
      return reply
        .status(400)
        .send({ error: true, message: 'Todos os campos são requeridos.' })
    }

    try {
      //Chamar service
      const loginUserService = new LoginUserService()

      //Acessar o método do service
      const login = await loginUserService.execute({ email, password })

      reply.send(login)
    } catch (error: any) {
      return reply.status(400).send({ erro: true, message: error.message })
    }
  }
}

export { LoginUserController }
