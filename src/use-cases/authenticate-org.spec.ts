import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateOrgUseCase } from './authenticate-org'
import { hash } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrgUseCase

describe('Authenticate Org Use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgUseCase(orgsRepository)
  })

  it('Should be able to create org', async () => {
    await orgsRepository.create({
      name: 'Org4',
      email: 'org4@email.com',
      phone: '123',
      password_hash: await hash('123456', 6),
      cep: '123456',
      street: 'rua 1',
      city: 'Sao jose',
      neighborhood: 'asd',
    })

    const { org } = await sut.execute({
      email: 'org4@email.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
