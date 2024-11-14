import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from './create-org'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('Should be able to create org', async () => {
    const { org } = await sut.execute({
      name: 'Org4',
      email: 'org4@email.com',
      phone: '123',
      password: '123456',
      cep: '123456',
      street: 'rua 1',
      city: 'Sao jose',
      neighborhood: 'asd',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('Should not be able to create org with same email', async () => {
    await sut.execute({
      name: 'Org4',
      email: 'org4@email.com',
      phone: '123',
      password: '123456',
      cep: '123456',
      street: 'rua 1',
      city: 'Sao jose',
      neighborhood: 'asd',
    })

    await expect(() =>
      sut.execute({
        name: 'Org4',
        email: 'org4@email.com',
        phone: '123',
        password: '123456',
        cep: '123456',
        street: 'rua 1',
        city: 'Sao jose',
        neighborhood: 'asd',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
