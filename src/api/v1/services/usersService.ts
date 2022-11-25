import { PrismaClient, User } from '@prisma/client'

import { PrismaError } from '@errors/PrismaError'

const prisma = new PrismaClient()

export async function create(phoneNumber: string) {
  try {
    const newUser = await prisma.user.create({
      data: {
        phoneNumber: phoneNumber,
      },
    })

    return newUser
  } catch (err) {
    throw new PrismaError(err)
  }
}

export async function findByPhoneNumber(phoneNumber: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        phoneNumber: phoneNumber,
      },
    })

    return user
  } catch (err) {
    throw new PrismaError(err)
  }
}

export async function updateByPhoneNumber(
  phoneNumber: string,
  payload: Partial<User>,
) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        phoneNumber: phoneNumber,
      },
      data: payload,
    })

    return updatedUser
  } catch (err) {
    throw new PrismaError(err)
  }
}
