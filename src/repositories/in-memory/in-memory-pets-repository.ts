import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { FindManyByQueryParams } from '../pets-repository'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository {
  public items: Pet[] = []

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      age: data.age,
      size: data.size,
      energy: data.energy,
      independency_level: data.independency_level,
      environment: data.environment,
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }

  async findManyByQuery(data: FindManyByQueryParams) {
    const orgsByCity = await this.orgsRepository.findByCity(data.city)

    const pets = this.items
      .filter((item) => orgsByCity.find((org) => org.id === item.org_id))
      .filter((item) => (data.age ? data.age === item.age : true))
      .filter((item) => (data.energy ? data.energy === item.energy : true))
      .filter((item) =>
        data.environment ? data.environment === item.environment : true,
      )
      .filter((item) => (data.size ? data.size === item.size : true))
      .filter((item) =>
        data.independency_level
          ? data.independency_level === item.independency_level
          : true,
      )

    return pets
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      throw new Error()
    }

    return pet
  }
}
