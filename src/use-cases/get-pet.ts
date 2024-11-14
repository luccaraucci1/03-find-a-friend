import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface SearchPetsUseCaseRequest {
  id: string
}

interface SearchPetsUseCaseResponse {
  pet: Pet
}

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse | null> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new Error()
    }

    return { pet }
  }
}
