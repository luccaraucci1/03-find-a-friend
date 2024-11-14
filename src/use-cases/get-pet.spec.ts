import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPetsUseCase } from './search-pets'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { makePet } from './utils/make-pet'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: SearchPetsUseCase

describe('Get Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('Should be able to get pet by id', async () => {
    const pet = await petsRepository.create(makePet())

    await petsRepository.create(makePet())
    await petsRepository.create(makePet())
    await petsRepository.create(makePet())

    const petFound = await petsRepository.findById(pet.id)

    expect(petFound.id).toEqual(expect.any(String))
  })
})
