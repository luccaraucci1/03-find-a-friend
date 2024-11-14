import { faker } from '@faker-js/faker'
import {
  Age,
  Size,
  Energy,
  Independency_Level,
  Environment,
} from '@prisma/client'
import { randomUUID } from 'crypto'

interface MakePetProps {
  org_id?: string
  age?: Age
  size?: Size
  energy?: Energy
  independency_level?: Independency_Level
  environment?: Environment
}

export function makePet(overwrite?: MakePetProps) {
  return {
    name: faker.animal.petName(),
    description: 'asd',
    age:
      overwrite?.age ?? faker.helpers.arrayElement(['puppy', 'adult', 'elder']),
    size:
      overwrite?.size ?? faker.helpers.arrayElement(['small', 'medium', 'big']),
    energy:
      overwrite?.energy ??
      faker.helpers.arrayElement(['low', 'medium', 'high']),
    independency_level:
      overwrite?.independency_level ??
      faker.helpers.arrayElement(['low', 'medium', 'high']),
    environment:
      overwrite?.environment ?? faker.helpers.arrayElement(['small', 'big']),
    org_id: overwrite?.org_id ?? randomUUID(),
  }
}
