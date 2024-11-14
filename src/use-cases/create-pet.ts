import { PetsRepository } from '@/repositories/pets-repository'
import {
  Age,
  Energy,
  Environment,
  Independency_Level,
  Pet,
  Size,
} from '@prisma/client'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  age: Age
  size: Size
  energy: Energy
  independency_level: Independency_Level
  environment: Environment
  org_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    description,
    age,
    size,
    energy,
    independency_level,
    environment,
    org_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      size,
      energy,
      independency_level,
      environment,
      org_id,
    })

    return { pet }
  }
}
