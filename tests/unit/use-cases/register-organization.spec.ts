import { describe, it, beforeEach, expect } from 'vitest'
import {
  RegisterOrganizationUseCase,
  RegisterOrganizationUseCaseProps,
} from '../../../src/domain/use-cases/register-organization'
import { InMemoryOrganizationRepository } from '../../../src/data/repositories/in-memory/organization'
import { faker } from '@faker-js/faker/locale/pt_BR'

describe('Register Organization Use Case tests', () => {
  let sutUseCase: RegisterOrganizationUseCase
  let organizationRepository: InMemoryOrganizationRepository

  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    sutUseCase = new RegisterOrganizationUseCase(organizationRepository)
  })

  it('Should be able to register an organization', async () => {
    const organization: RegisterOrganizationUseCaseProps = {
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
      city: faker.location.city(),
      state: faker.location.state(),
      password: faker.internet.password(),
      personName: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
    }

    await sutUseCase.execute(organization)

    expect(organizationRepository.organizations[0].id).toBeTruthy()
    expect(organizationRepository.organizations[0].email).toEqual(
      organization.email,
    )
    expect(organizationRepository.organizations[0].password).not.toEqual(
      organization.password,
    )
  })

  it('Should not be able to register an organization with repeated email', async () => {
    const organization: RegisterOrganizationUseCaseProps = {
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
      city: faker.location.city(),
      state: faker.location.state(),
      password: faker.internet.password(),
      personName: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
    }

    await sutUseCase.execute(organization)

    const organization2: RegisterOrganizationUseCaseProps = {
      email: organization.email,
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
      city: faker.location.city(),
      state: faker.location.state(),
      password: faker.internet.password(),
      personName: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
    }
    expect(
      async () => await sutUseCase.execute(organization2),
    ).rejects.toThrowError()
  })

  it('Should not be able to register an organization with repeated phone', async () => {
    const organization: RegisterOrganizationUseCaseProps = {
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
      city: faker.location.city(),
      state: faker.location.state(),
      password: faker.internet.password(),
      personName: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
    }

    await sutUseCase.execute(organization)

    const organization2: RegisterOrganizationUseCaseProps = {
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
      city: faker.location.city(),
      state: faker.location.state(),
      password: faker.internet.password(),
      personName: faker.person.fullName(),
      phoneNumber: organization.phoneNumber,
    }
    expect(
      async () => await sutUseCase.execute(organization2),
    ).rejects.toThrowError()
  })

  it('Should not be able to register an organization without a valid CEP', async () => {
    const organization: RegisterOrganizationUseCaseProps = {
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      cep: '',
      city: faker.location.city(),
      state: faker.location.state(),
      password: faker.internet.password(),
      personName: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
    }

    expect(
      async () => await sutUseCase.execute(organization),
    ).rejects.toThrowError()
  })
  it('Should not be able to register an organization without a city', async () => {
    const organization: RegisterOrganizationUseCaseProps = {
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
      city: '',
      state: faker.location.state(),
      password: faker.internet.password(),
      personName: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
    }

    expect(
      async () => await sutUseCase.execute(organization),
    ).rejects.toThrowError()
  })
  it('Should not be able to register an organization without state', async () => {
    const organization: RegisterOrganizationUseCaseProps = {
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
      city: faker.location.city(),
      state: '',
      password: faker.internet.password(),
      personName: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
    }

    expect(
      async () => await sutUseCase.execute(organization),
    ).rejects.toThrowError()
  })
})
