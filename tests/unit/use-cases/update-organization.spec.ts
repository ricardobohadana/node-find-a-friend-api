import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryOrganizationRepository } from '../../../src/data/repositories/in-memory/organization'
import { faker } from '@faker-js/faker/locale/pt_BR'
import { UpdateOrganizationUseCase } from '../../../src/domain/use-cases/update-organization'
import { Organization } from '../../../src/domain/entities/organization'

describe('Update Organization Use Case tests', () => {
  let sutUseCase: UpdateOrganizationUseCase
  let organizationRepository: InMemoryOrganizationRepository
  let organization: Organization

  beforeEach(async () => {
    organizationRepository = new InMemoryOrganizationRepository()
    sutUseCase = new UpdateOrganizationUseCase(organizationRepository)

    organization = Organization.create({
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
      password: faker.internet.password(),
      personName: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
    })

    await organizationRepository.create(organization)
  })

  it('Should be able to update an organization', async () => {
    const organizationUpdate = {
      id: organization.id,
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
      personName: faker.person.fullName(),
    }

    await sutUseCase.execute(organizationUpdate)

    expect(organizationRepository.organizations[0].id).toBeTruthy()
    expect(organizationRepository.organizations[0].email).toEqual(
      organization.email,
    )
    expect(organizationRepository.organizations[0].address).toEqual(
      organizationUpdate.address,
    )
    expect(organizationRepository.organizations[0].cep).toEqual(
      organizationUpdate.cep,
    )
    expect(organizationRepository.organizations[0].personName).toEqual(
      organizationUpdate.personName,
    )
  })

  it('Should be able to update a single field of an organization', async () => {
    const organizationUpdate = {
      id: organization.id,
      personName: faker.person.fullName(),
    }

    await sutUseCase.execute(organizationUpdate)

    expect(organizationRepository.organizations[0].id).toBeTruthy()
    expect(organizationRepository.organizations[0].email).toEqual(
      organization.email,
    )
    expect(organizationRepository.organizations[0].address).toEqual(
      organization.address,
    )
    expect(organizationRepository.organizations[0].cep).toEqual(
      organization.cep,
    )
    expect(organizationRepository.organizations[0].personName).toEqual(
      organizationUpdate.personName,
    )
  })

  it('Should not be able to update an unexisting organization', async () => {
    const organizationUpdate = {
      id: '1',
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
      personName: faker.person.fullName(),
    }

    expect(
      async () => await sutUseCase.execute(organizationUpdate),
    ).rejects.toThrowError()
  })
})
