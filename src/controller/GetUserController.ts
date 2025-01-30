import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserService } from '../service/CreateUserService'
import { GetUserService } from '../service/GetUserService'

class GetUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { user } = request

    if (!user) {
      return reply
        .status(400)
        .send({ error: true, message: 'User is required.' })
    }

    try {
      const getUserService = new GetUserService()

      const getUser = await getUserService.execute({
        user
      })

      return reply.status(200).send(getUser)
    } catch (error: any) {
      return reply.status(400).send({ erro: true, message: error.message })
    }

    // const { fullName, email, password } = request.body as {
    //   fullName: string
    //   email: string
    //   password: string
    // }

    // if (!fullName || !email || !password) {
    //   return reply
    //     .status(400)
    //     .send({ error: true, message: 'Todos os campos são requeridos.' })
    // }

    // try {
    //   //Chamar service
    //   const createUserService = new CreateUserService()

    //   //Acessar o método do service
    //   const user = await createUserService.execute({
    //     fullName,
    //     email,
    //     password
    //   })

    //   reply.send(user)
    // } catch (error: any) {
    //   return reply.status(400).send({ erro: true, message: error.message })
    // }
  }
}

export { GetUserController }
