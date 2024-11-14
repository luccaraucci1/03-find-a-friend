import fastify from 'fastify'
import { petRoutes } from './http/controllers/pets/routes'
import { orgRoutes } from './http/controllers/orgs/routes'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(orgRoutes)
app.register(petRoutes)
app.register(fastifyJwt, {
  secret: '123456',
  sign: {
    expiresIn: '10m',
  },
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
})

app.register(fastifyCookie)
