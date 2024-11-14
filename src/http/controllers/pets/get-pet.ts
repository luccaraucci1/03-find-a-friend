import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetParamsSchema = z.object({
    id: z.string(),
  })

  const id = createPetParamsSchema.parse(request.query)

  const getPetUseCase = makeGetPetUseCase()

  const pet = await getPetUseCase.execute(id)

  return reply.status(200).send(pet)
}
