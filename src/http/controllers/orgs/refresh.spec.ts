import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to refresh token', async () => {
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

    const cookies = authResponse.get('Set-Cookie') ?? []

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
