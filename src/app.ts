import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { routes } from './routes'
import { authenticateToken } from './middleware/authenticateToken'
import prismaClient from './prisma'

const app = fastify({ logger: true })

app.register(routes)

interface RegisteredMoment {
  title: string
  story: string
  visitedLocation: string[]
  imageUrl: string
  visitedDate: string
}

app.post(
  '/add-registered-moment',
  { preHandler: authenticateToken },
  async (request: FastifyRequest, reply: FastifyReply) => {
    const { title, story, visitedLocation, imageUrl, visitedDate } =
      request.body as RegisteredMoment

    const { user } = request

    if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
      return reply
        .status(400)
        .send({ error: true, message: 'All fields are required!' })
    }

    if (!user) {
      return reply
        .status(400)
        .send({ error: true, message: 'User does not exists!' })
    }

    const parsedVisitedDate = new Date(parseInt(visitedDate))

    const registeredMoment = await prismaClient.registeredMoment.create({
      data: {
        title,
        story,
        visitedLocation,
        userId: user.userId,
        imageUrl,
        visitedDate: parsedVisitedDate
      }
    })

    return reply.status(201).send({ error: false, moment: registeredMoment })
  }
)

export default app
