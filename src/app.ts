import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { routes } from './routes'
import { authenticateToken } from './middleware/authenticateToken'
import prismaClient from './prisma'

const app = fastify({ logger: true })

app.register(routes)

app.get(
  '/get-all-moments',
  { preHandler: authenticateToken },
  async (request: FastifyRequest, reply: FastifyReply) => {
    const { user } = request

    if (!user) {
      throw new Error('User does not exists!')
    }

    const registeredMoments = await prismaClient.registeredMoment.findMany({
      where: {
        userId: user.userId
      },
      orderBy: { isFavorite: 'desc' }
    })

    return registeredMoments
  }
)

export default app
