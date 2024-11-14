import { prisma } from '@/lib/prisma'
import { Pet, Prisma } from '@prisma/client'
import { FindManyByQueryParams, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string): Promise<Pet> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    if (!pet) {
      throw new Error()
    }

    return pet
  }

  async findManyByQuery(data: FindManyByQueryParams): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        age: data.age,
        energy: data.energy,
        environment: data.environment,
        independency_level: data.independency_level,
        size: data.size,
        org: {
          city: {
            contains: data.city,
            mode: 'insensitive',
          },
        },
      },
    })

    if (!pets) {
      throw new Error()
    }

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
