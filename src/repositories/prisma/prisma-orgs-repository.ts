import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaOrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async findByCity(city: string) {
    const orgs = await prisma.org.findMany({
      where: {
        city,
      },
    })

    if (!orgs) {
      throw new Error()
    }

    return orgs
  }
}
