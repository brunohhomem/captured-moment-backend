import prismaClient from '../../prisma'

interface UserProps {
  user: {
    userId: string
  }
}

class GetAllMomentsService {
  async execute({ user }: UserProps) {
    const registeredMoments = await prismaClient.registeredMoment.findMany({
      where: {
        userId: user.userId
      },
      orderBy: { isFavorite: 'desc' }
    })
    return { registeredMoments }
  }
}

export { GetAllMomentsService }
