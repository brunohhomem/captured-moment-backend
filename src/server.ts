import fastify from 'fastify'

const app = fastify({ logger: true })

const start = async () => {
  app.get('/backend', async (request, reply) => {
    reply.status(200).send({ message: 'Backend running' })
  })

  app.listen({ port: 8000 }, () => {
    console.log('Server running...')
  })
}

start()
