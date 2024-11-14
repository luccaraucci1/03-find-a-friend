import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.enum(['puppy', 'adult', 'elder']),
    size: z.enum(['small', 'medium', 'big']),
    energy: z.enum(['low', 'medium', 'high']),
    independency_level: z.enum(['low', 'medium', 'high']),
    environment: z.enum(['small', 'big']),
  })

  const body = createPetBodySchema.parse(request.body)

  const org_id = request.user.sub

  const createPetUseCase = makeCreatePetUseCase()

  const { pet } = await createPetUseCase.execute({ ...body, org_id })

  return reply.status(201).send(pet)
}
