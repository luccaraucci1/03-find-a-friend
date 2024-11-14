import { app } from '@/app'
import { create } from './create'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { getPet } from './get-pet'

export function petRoutes() {
  app.get('/pets', getPet)

  // auth
  app.post('/pets', { onRequest: [verifyJwt] }, create)
}
