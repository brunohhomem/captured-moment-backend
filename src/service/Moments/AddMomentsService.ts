import prismaClient from '../../prisma'

interface RegisteredMomentProps {
  title: string
  story: string
  visitedLocation: string[]
  user: { userId: string }
  imageUrl: string
  visitedDate: string
}
class AddMomentsService {
  async execute({
    title,
    story,
    visitedLocation,
    user,
    imageUrl,
    visitedDate
  }: RegisteredMomentProps) {
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

    return { moment: registeredMoment }
  }
}

export { AddMomentsService }
