import bcrypt from 'bcrypt'
import prismaClient from '../../prisma'
import { AuthUtils } from '../../utils/AuthUtils'

interface UserProps {
  email: string
  password: string
}

class LoginUserService {
  async execute({ email, password }: UserProps) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if (!user) {
      throw new Error('Usuário não encontrado.')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas.')
    }

    const accessToken = AuthUtils.generateAccessToken((await user).id)

    return {
      error: true,
      message: 'Login bem sucedido.',
      user: { fullName: user.fullName, email: user.email },
      accessToken
    }
  }
}

export { LoginUserService }
