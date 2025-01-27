import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prismaClient from '../prisma'

interface UserProps {
  fullName: string
  email: string
  password: string
}

class CreateUserService {
  async execute({ fullName, email, password }: UserProps) {
    const isUser = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if (isUser) {
      throw new Error('Usuário já existe.')
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

    return {
      error: false,
      user: {
        fullName: (await user).fullName,
        email: (await user).email
      },
      accessToken,
      message: 'Registrado com sucesso'
    }
  }
}

export { CreateUserService }
