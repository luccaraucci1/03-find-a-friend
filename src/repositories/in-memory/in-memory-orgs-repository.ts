import { Org, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      email: data.email,
      phone: data.phone,
      password_hash: data.password_hash,
      name: data.name,
      cep: data.cep,
      street: data.street,
      city: data.city,
      neighborhood: data.neighborhood,
    }

    this.items.push(org)

    return org
  }

  async findByCity(city: string) {
    const orgs = this.items.filter((item) => item.city === city)

    if (!orgs) {
      throw new Error()
    }

    return orgs
  }
}
