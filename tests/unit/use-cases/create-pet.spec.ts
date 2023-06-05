import { describe, it, beforeEach, expect } from 'vitest'
import {
  CreatePetUseCase,
  CreatePetUseCaseProps,
} from '../../../src/domain/use-cases/create-pet'
import { InMemoryPetRepository } from '../../../src/data/repositories/in-memory/pet'
import { faker } from '@faker-js/faker/locale/pt_BR'

describe('Create Pet Use Case tests', () => {
  let sutUseCase: CreatePetUseCase
  let petRepository: InMemoryPetRepository

  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    sutUseCase = new CreatePetUseCase(petRepository)
  })

  it('Should be able to create a pet', async () => {
    const pet: CreatePetUseCaseProps = {
      organizationId: '1',
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
