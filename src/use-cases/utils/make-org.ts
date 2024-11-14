import { hash } from 'bcryptjs'
import { faker } from '@faker-js/faker'

interface MakeOrgProps {
  city?: string
}

export async function makeOrg(overwrite?: MakeOrgProps) {
  return {
    name: faker.company.name(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: 'international' }),
    password_hash: await hash('123456', 6),
    cep: faker.location.zipCode(),
    street: faker.location.streetAddress(),
    city: overwrite?.city ?? faker.location.city(),
    neighborhood: 'Bairro',
  }
}
