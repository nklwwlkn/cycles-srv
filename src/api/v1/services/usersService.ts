import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

export async function create(phoneNumber: string) {
  const newUser = await prisma.user.create({
    data: {
      phoneNumber: phoneNumber,
    },
  })

  return newUser
}

export async function findByPhoneNumber(phoneNumber: string) {
  const user = await prisma.user.findUnique({
    where: {
      phoneNumber: phoneNumber,
    },
  })

  return user
}

export async function updateByPhoneNumber(
  phoneNumber: string,
  payload: Partial<User>,
) {
  const updatedUser = await prisma.user.update({
    where: {
      phoneNumber: phoneNumber,
    },
    data: payload,
  })

  return updatedUser
}
