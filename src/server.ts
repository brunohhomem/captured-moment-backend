import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import prismaClient from './prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const app = fastify({ logger: true })

const start = async () => {
  app.get('/backend', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send({ message: 'Backend running' })
  })

  //Criação de Usuário
  app.post(
    '/create-account',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { fullName, email, password } = request.body as {
        fullName: string
        email: string
        password: string
      }

      if (!fullName || !email || !password) {
        return reply
          .status(400)
          .send({ error: true, message: 'Todos os campos são requeridos.' })
      }

      const isUser = await prismaClient.user.findFirst({
        where: {
          email: email
        }
      })

      if (isUser) {
        return reply
          .status(400)
          .send({ error: true, message: 'Usuário já existe.' })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const user = prismaClient.user.create({
        data: {
          fullName,
          email,
          password: hashedPassword
        }
      })

      const accessToken = jwt.sign(
        {
          userId: (await user).id
        },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: '72h' }
      )

      reply.status(200).send({
        error: false,
        user: {
          fullName: (await user).fullName,
          email: (await user).email
        },
        accessToken,
        message: 'Registrado com sucesso'
      })
    }
  )

  app.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = request.body as {
      email: string
      password: string
    }

    if (!email || !password) {
      return reply
        .status(400)
        .send({ error: true, message: 'Todos os campos são requeridos.' })
    }

    const user = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if (!user) {
      return reply
        .status(400)
        .send({ error: true, message: 'Usuário não encontrado.' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return reply
        .status(400)
        .send({ error: true, message: 'Credenciais inválidas.' })
    }

    const accessToken = jwt.sign(
      {
        userId: user.id
      },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: '72h' }
    )

    return {
      error: true,
      message: 'Login bem sucedido.',
      user: { fullName: user.fullName, email: user.email },
      accessToken
    }
  })

  app.listen({ port: 8000 }, () => {
    console.log('Server running...')
  })
}

start()
