import fastify from 'fastify'
import { FastifyRequest } from './http/adapters/fastify-request'
import { FastifyResponse } from './http/adapters/fastify-response'
import { RegisterOrganizationController } from './http/controllers/register-organization'
import { LoginOrganizationController } from './http/controllers/login-organization'
import { CreatePetController } from './http/controllers/create-pet'
import { FetchPetsController } from './http/controllers/fetch-pets'

export const app = fastify()

app.post('/organizations/register', async (request, reply) => {
  const req = new FastifyRequest(request)
  const response = new FastifyResponse(reply)
  return await RegisterOrganizationController.register(req, response)
})

app.post('/organizations/login', async (request, reply) => {
  const req = new FastifyRequest(request)
  const response = new FastifyResponse(reply)
  return await LoginOrganizationController.login(req, response)
})

app.post('/pets/create', async (request, reply) => {
  const req = new FastifyRequest(request)
  const response = new FastifyResponse(reply)
  return await CreatePetController.create(req, response)
})

app.get('/pets', async (request, reply) => {
  const req = new FastifyRequest(request)
  const response = new FastifyResponse(reply)
  return await FetchPetsController.fetch(req, response)
})
