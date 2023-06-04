import { describe, it, beforeEach, expect } from 'vitest'
import {
  CreatePetUseCase,
  CreatePetUseCaseProps,
} from '../../../src/domain/use-cases/create-pet'
import { InMemoryPetRepository } from '../../../src/data/repositories/in-memory/pet'

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
})
