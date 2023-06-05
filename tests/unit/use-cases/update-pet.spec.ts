import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryPetRepository } from '../../../src/data/repositories/in-memory/pet'
import { faker } from '@faker-js/faker/locale/pt_BR'
import { UpdatePetUseCase } from '../../../src/domain/use-cases/update-pet'
import { Pet } from '../../../src/domain/entities/pet'

describe('Update Pet Use Case tests', () => {
  let sutUseCase: UpdatePetUseCase
  let petRepository: InMemoryPetRepository

  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    sutUseCase = new UpdatePetUseCase(petRepository)

    const pet = Pet.create({
      organizationId: '1',
      name: 'Carlos',
      description: 'Doguinho lindo',
      age: 'Filhote',
      size: 'Pequenino',
      energy: 'Baixa',
      independence: 'Baixo',
      environment: 'Amplo',
      adoptionRequirements: null,
      images: null,
    })
    await petRepository.create(pet)
  })

  it('Should be able to update a pet', async () => {
    const updatePetProps = {
      id: petRepository.pets[0].id,
      description: 'Nova descrição',
      age: 'Jovem' as 'Jovem',
      adoptionRequirements: [faker.lorem.sentence()],
      images: [faker.internet.url()],
    }
    await sutUseCase.execute(updatePetProps)

    expect(petRepository.pets[0].id).toBeTruthy()
    expect(petRepository.pets[0].description).toEqual(
      updatePetProps.description,
    )
    expect(petRepository.pets[0].age).toEqual(updatePetProps.age)
  })

  it('Should not be able to update an unexisting pet', async () => {
    const updatePetProps = {
      id: 'wrong id',
      description: 'Nova descrição',
      age: 'Jovem' as 'Jovem',
      adoptionRequirements: [faker.lorem.sentence()],
      images: [faker.internet.url()],
    }

    expect(
      async () => await sutUseCase.execute(updatePetProps),
    ).rejects.toThrowError()
  })
})
