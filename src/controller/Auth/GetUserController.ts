import { FastifyReply, FastifyRequest } from 'fastify'
import { GetUserService } from '../../service/Auth/GetUserService'

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
  }
}

export { GetUserController }
