import { describe, it, beforeEach, expect } from 'vitest'
import {
  CreatePetUseCase,
  CreatePetUseCaseProps,
} from '../../../src/domain/use-cases/create-pet'
import { InMemoryPetRepository } from '../../../src/data/repositories/in-memory/pet'
import { faker } from '@faker-js/faker/locale/pt_BR'
import { InMemoryOrganizationRepository } from '../../../src/data/repositories/in-memory/organization'
import { Organization } from '../../../src/domain/entities/organization'
import { EntityNotFoundError } from '../../../src/domain/errors/entity-not-found'

describe('Create Pet Use Case tests', () => {
  let sutUseCase: CreatePetUseCase
  let petRepository: InMemoryPetRepository
  let organizationRepository: InMemoryOrganizationRepository
  let org: Organization

  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    organizationRepository = new InMemoryOrganizationRepository()
    sutUseCase = new CreatePetUseCase(petRepository, organizationRepository)

    org = Organization.create({
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      cep: faker.location.zipCode(),
      password: faker.internet.password(),
      personName: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
      city: faker.location.city(),
      state: faker.location.state(),
    })
    await organizationRepository.create(org)
  })

  it('Should be able to create a pet', async () => {
    const pet: CreatePetUseCaseProps = {
      organizationId: org.id,
      name: 'Carlos',
      description: 'Doguinho lindo',
      age: 'Filhote',
      size: 'Pequenino',
      energy: 'Baixa',
      independence: 'Baixo',
      environment: 'Amplo',
    }

    await sutUseCase.execute(pet)

    expect(petRepository.pets[0].id).toBeTruthy()
    expect(petRepository.pets[0].organizationId).toEqual(pet.organizationId)
  })

  it('Should not be able to create a pet with a non-existing organization', async () => {
    const pet: CreatePetUseCaseProps = {
      organizationId: '2',
      name: 'Carlos',
      description: 'Doguinho lindo',
      age: 'Filhote',
      size: 'Pequenino',
      energy: 'Baixa',
      independence: 'Baixo',
      environment: 'Amplo',
    }

    expect(async () => await sutUseCase.execute(pet)).rejects.toThrow(
      EntityNotFoundError,
    )
  })

  it('Should not be able to create a pet with a description lenght greater than 250', async () => {
    const pet: CreatePetUseCaseProps = {
      organizationId: '1',
      name: 'Carlos',
      description: faker.lorem.words({ min: 251, max: 1000 }),
      age: 'Filhote',
      size: 'Pequenino',
      energy: 'Baixa',
      independence: 'Baixo',
      environment: 'Amplo',
    }

    expect(async () => await sutUseCase.execute(pet)).rejects.toThrowError()
  })
})
