import { app } from '@/app'
import { create } from './create'
import { authenticate } from './authenticate'
import { refresh } from './refresh'

export function orgRoutes() {
  app.post('/orgs', create)
  app.post('/authenticate', authenticate)
  app.patch('/token/refresh', refresh)
}
