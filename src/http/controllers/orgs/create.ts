import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    email: z.string(),
    name: z.string(),
    phone: z.string(),
    password: z.string(),
    cep: z.string(),
    street: z.string(),
    city: z.string(),
    neighborhood: z.string(),
  })

  const { email, name, phone, password, cep, street, city, neighborhood } =
    createOrgBodySchema.parse(request.body)

  const createOrgUseCase = makeCreateOrgUseCase()

  try {
    await createOrgUseCase.execute({
      email,
      name,
      phone,
      password,
      cep,
      street,
      city,
      neighborhood,
    })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
