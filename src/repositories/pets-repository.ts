import {
  Age,
  Energy,
  Environment,
  Independency_Level,
  Pet,
  Prisma,
  Size,
} from '@prisma/client'

export interface FindManyByQueryParams {
  name?: string
  description?: string
  age?: Age
  size?: Size
  energy?: Energy
  independency_level?: Independency_Level
  environment?: Environment
  city: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findManyByQuery(data: FindManyByQueryParams): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}
