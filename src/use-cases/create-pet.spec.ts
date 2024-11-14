import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { hash } from 'bcryptjs'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('Should be able to create pet', async () => {
    const org = await orgsRepository.create({
      name: 'Org4',
      email: 'org4@email.com',
      phone: '123',
      password_hash: await hash('123456', 6),
      cep: '123456',
      street: 'rua 1',
      city: 'Sao jose',
      neighborhood: 'asd',
    })

    const { pet } = await sut.execute({
      name: 'Oswaldo 2',
      description: 'asd',
      age: 'elder',
      size: 'small',
      energy: 'low',
      independency_level: 'high',
      environment: 'small',
      org_id: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
