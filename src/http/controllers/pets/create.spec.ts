import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create pet', async () => {
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

    const authResponse = await request(app.server).post('/authenticate').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Oswaldo',
        description: 'asd',
        age: 'elder',
        size: 'small',
        energy: 'low',
        independency_level: 'high',
        environment: 'small',
      })
    expect(response.statusCode).toEqual(201)
  })
})
