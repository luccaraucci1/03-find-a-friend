import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPetsUseCase } from './search-pets'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { makePet } from './utils/make-pet'
import { makeOrg } from './utils/make-org'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('Should be able to search pets by city', async () => {
    const org1 = await orgsRepository.create(
      await makeOrg({ city: 'São Paulo' }),
    )

    const org2 = await orgsRepository.create(await makeOrg({ city: 'Guarujá' }))

    await petsRepository.create(makePet({ org_id: org1.id }))

    await petsRepository.create(makePet({ org_id: org1.id }))

    await petsRepository.create(makePet({ org_id: org2.id }))

    const pets = await petsRepository.findManyByQuery({ city: 'São Paulo' })

    expect(pets).toHaveLength(2)
  })

  it('Should be able to seatch pets by city and age', async () => {
    const org1 = await orgsRepository.create(
      await makeOrg({ city: 'São Paulo' }),
    )

    await petsRepository.create(makePet({ org_id: org1.id, age: 'puppy' }))

    await petsRepository.create(makePet({ org_id: org1.id, age: 'puppy' }))

    await petsRepository.create(makePet({ org_id: org1.id, age: 'elder' }))

    const pets = await petsRepository.findManyByQuery({
      city: 'São Paulo',
      age: 'puppy',
    })

    expect(pets).toHaveLength(2)
  })

  it('Should be able to seatch pets by city and size', async () => {
    const org1 = await orgsRepository.create(
      await makeOrg({ city: 'São Paulo' }),
    )

    await petsRepository.create(makePet({ org_id: org1.id, size: 'big' }))

    await petsRepository.create(makePet({ org_id: org1.id, size: 'medium' }))

    await petsRepository.create(makePet({ org_id: org1.id, size: 'small' }))

    const pets = await petsRepository.findManyByQuery({
      city: 'São Paulo',
      size: 'small',
    })

    expect(pets).toHaveLength(1)
  })

  it('Should be able to seatch pets by city and energy', async () => {
    const org1 = await orgsRepository.create(
      await makeOrg({ city: 'São Paulo' }),
    )

    await petsRepository.create(makePet({ org_id: org1.id, energy: 'high' }))

    await petsRepository.create(makePet({ org_id: org1.id, energy: 'high' }))

    await petsRepository.create(makePet({ org_id: org1.id, energy: 'high' }))

    await petsRepository.create(makePet({ org_id: org1.id, energy: 'low' }))

    const pets = await petsRepository.findManyByQuery({
      city: 'São Paulo',
      energy: 'high',
    })

    expect(pets).toHaveLength(3)
  })

  it('Should be able to seatch pets by city and independency level', async () => {
    const org1 = await orgsRepository.create(
      await makeOrg({ city: 'São Paulo' }),
    )

    await petsRepository.create(
      makePet({ org_id: org1.id, independency_level: 'high' }),
    )

    await petsRepository.create(
      makePet({ org_id: org1.id, independency_level: 'high' }),
    )

    await petsRepository.create(
      makePet({ org_id: org1.id, independency_level: 'low' }),
    )

    const pets = await petsRepository.findManyByQuery({
      city: 'São Paulo',
      independency_level: 'high',
    })

    expect(pets).toHaveLength(2)
  })

  it('Should be able to seatch pets by city and environment', async () => {
    const org1 = await orgsRepository.create(
      await makeOrg({ city: 'São Paulo' }),
    )

    await petsRepository.create(
      makePet({ org_id: org1.id, environment: 'big' }),
    )

    await petsRepository.create(
      makePet({ org_id: org1.id, environment: 'big' }),
    )

    await petsRepository.create(
      makePet({ org_id: org1.id, environment: 'small' }),
    )

    const pets = await petsRepository.findManyByQuery({
      city: 'São Paulo',
      environment: 'small',
    })

    expect(pets).toHaveLength(1)
  })
})
