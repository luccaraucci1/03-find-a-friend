import { PetsRepository } from '@/repositories/pets-repository'
import {
  Age,
  Energy,
  Environment,
  Independency_Level,
  Pet,
  Size,
} from '@prisma/client'

interface SearchPetsUseCaseRequest {
  data: {
    description?: string
    age?: Age
    size?: Size
    energy?: Energy
    independency_level?: Independency_Level
    environment?: Environment
    city: string
  }
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    data,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse | null> {
    const pets = await this.petsRepository.findManyByQuery(data)

    if (!pets) {
      throw new Error()
    }

    return { pets }
  }
}
