import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'

interface CreateOrgUseCaseRequest {
  name: string
  email: string
  cep: string
  city: string
  neighborhood: string
  password: string
  phone: string
  street: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    cep,
    city,
    email,
    neighborhood,
    password,
    phone,
    street,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new Error()
    }

    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      name,
      cep,
      city,
      email,
      neighborhood,
      password_hash,
      phone,
      street,
    })

    return { org }
  }
}
