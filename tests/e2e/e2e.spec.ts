import { execSync } from 'node:child_process'
import request from 'supertest'
import { beforeAll, describe, beforeEach, afterAll, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import { app } from '../../src/app'
import { randomUUID } from 'node:crypto'
import { knex } from '../../src/data/knex/config'

describe('E2E Tests', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })
  const data = {
    email: faker.internet.email(),
    address: faker.location.streetAddress(),
    cep: faker.location.zipCode(),
    city: faker.location.city(),
    state: faker.location.state(),
    password: faker.internet.password(),
    personName: faker.person.fullName(),
    phoneNumber: faker.phone.number(),
  }
  async function register() {
    await request(app.server)
      .post('/organizations/register')
      .send(data)
      .expect(201)
  }

  it('should register an organization once', async () => {
    const data = {
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
      city: faker.location.city(),
      state: faker.location.state(),
      password: faker.internet.password(),
      personName: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
    }
    const response = await request(app.server)
      .post('/organizations/register')
      .send(data)
      .expect(201)

    expect(response.body).toEqual({
      message: 'Organization created successfully',
    })
    const errorResponse = await request(app.server)
      .post('/organizations/register')
      .send(data)
      .expect(409)
    expect(errorResponse.body).toEqual({
      error: 'This Organization already exists',
    })
  })

  it('should login an organization', async () => {
    await register()
    const input = {
      email: data.email,
      password: data.password,
    }
    const response = await request(app.server)
      .post('/organizations/login')
      .send(input)
      .expect(200)

    expect(response.body).toMatchObject(
      expect.objectContaining({
        accessToken: expect.any(String),
      }),
    )
  })

  it('should not login an organization', async () => {
    const input = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    await request(app.server)
      .post('/organizations/login')
      .send(input)
      .expect(401)
  })

  it.only('should create a pet', async () => {
    await register()
    const loginInput = {
      email: data.email,
      password: data.password,
    }
    const loginResponse = await request(app.server)
      .post('/organizations/login')
      .send(loginInput)
      .expect(200)

    const accessToken = loginResponse.body.accessToken
    const input = {
      name: 'Uber',
      description: 'Doguinho lindo',
      age: 'Filhote',
      size: 'Pequenino',
      energy: 'Baixa',
      independence: 'Baixo',
      environment: 'Amplo',
    }
    const response = await request(app.server)
      .post('/pets/create')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(input)
      .expect(201)

    expect(response.body).toMatchObject(
      expect.objectContaining({
        message: expect.any(String),
      }),
    )
  })

  it('should not create a pet', async () => {
    const input = {
      organizationId: randomUUID(),
      name: 'Uber',
      description: 'Doguinho lindo',
      age: 'Filhote',
      size: 'Pequenino',
      energy: 'Baixa',
      independence: 'Baixo',
      environment: 'Amplo',
    }
    await request(app.server).post('/pets/create').send(input).expect(404)
  })

  it('should fetch pets', async () => {
    await register()
    const organizationId = (
      await knex.table('organization').select('id').first()
    ).id
    const input = {
      organizationId,
      name: 'Uber',
      description: 'Doguinho lindo',
      age: 'Filhote',
      size: 'Pequenino',
      energy: 'Baixa',
      independence: 'Baixo',
      environment: 'Amplo',
    }
    await request(app.server).post('/pets/create').send(input).expect(201)
    const city = data.city
    const response = await request(app.server)
      .get('/pets')
      .query({ city })
      .expect(200)
    expect(response.body).toMatchObject(
      expect.objectContaining({
        pets: expect.any(Array),
      }),
    )
  })
})
