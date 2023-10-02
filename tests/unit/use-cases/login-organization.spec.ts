import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryOrganizationRepository } from '../../../src/data/repositories/in-memory/organization'
import { faker } from '@faker-js/faker/locale/pt_BR'
import { Organization } from '../../../src/domain/entities/organization'
import { LoginOrganizationUseCase } from '../../../src/domain/use-cases/login-organization'
import { AuthFailedError } from '../../../src/domain/errors/auth-failed'
import { hash } from 'bcryptjs'
import { JwtGateway } from '../../../src/domain/interfaces/gateways/jwt'
import { JsonWebTokenGateway } from '../../../src/http/adapters/jwt-gateway'
import { env } from '../../../src/env'

describe('Register Organization Use Case tests', () => {
  let sutUseCase: LoginOrganizationUseCase
  let organizationRepository: InMemoryOrganizationRepository
  let jwtGateway: JwtGateway
  let password: string
  let org: Organization
  beforeEach(async () => {
    organizationRepository = new InMemoryOrganizationRepository()
    jwtGateway = new JsonWebTokenGateway(env.JWT_SECRET)
    sutUseCase = new LoginOrganizationUseCase(
      organizationRepository,
      jwtGateway,
    )
    password = faker.internet.password()
    org = Organization.create({
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
      password: await hash(password, 10),
      personName: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
      city: faker.location.city(),
      state: faker.location.state(),
    })
    await organizationRepository.create(org)
  })

  it('Should be able to login an organization', async () => {
    const input = {
      email: org.email,
      password,
    }

    const response = await sutUseCase.execute(input)
    expect(response.accessToken).toBeTruthy()
  })

  it('Should not be able to login an organization with wrong password', async () => {
    const input = {
      email: org.email,
      password: faker.internet.password(),
    }

    expect(async () => await sutUseCase.execute(input)).rejects.toThrow(
      AuthFailedError,
    )
  })
  it('Should not be able to login an organization with wrong email', async () => {
    const input = {
      email: faker.internet.email(),
      password,
    }

    expect(async () => await sutUseCase.execute(input)).rejects.toThrow(
      AuthFailedError,
    )
  })
  it('Should not be able to login an organization with wrong email and password', async () => {
    const input = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }

    expect(async () => await sutUseCase.execute(input)).rejects.toThrow(
      AuthFailedError,
    )
  })
})
