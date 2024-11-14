import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create org', async () => {
    await request(app.server).post('/orgs').send({
      name: 'JohnDoe',
      email: 'johndoe@example.com',
      phone: '123',
      password: '123456',
      cep: '123456',
      street: 'rua 1',
      city: 'Sao Paulo',
      neighborhood: 'asd',
    })

    const response = await request(app.server).post('/authenticate').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
