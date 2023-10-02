import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryPetRepository } from '../../../src/data/repositories/in-memory/pet'
import { faker } from '@faker-js/faker/locale/pt_BR'
import { Pet } from '../../../src/domain/entities/pet'
import { InMemoryOrganizationRepository } from '../../../src/data/repositories/in-memory/organization'
import { Organization } from '../../../src/domain/entities/organization'
import { FetchPetsUseCase } from '../../../src/domain/use-cases/fetch-pets'

describe('Fetch Pets Use Case tests', () => {
  let sutUseCase: FetchPetsUseCase
  let petRepository: InMemoryPetRepository
  let organizationRepository: InMemoryOrganizationRepository
  let pet: Pet
  let organizations: Organization[]

  beforeEach(async () => {
    organizationRepository = new InMemoryOrganizationRepository()
    organizations = []
    for (let index = 0; index < 10; index++) {
      const city = index % 2 === 0 ? 'São Paulo' : faker.location.city()
      const org = Organization.create({
        email: faker.internet.email(),
        address: faker.location.streetAddress(),
        cep: faker.location.zipCode(),
        password: faker.internet.password(),
        personName: faker.person.fullName(),
        phoneNumber: faker.phone.number(),
        city,
        state: faker.location.state(),
      })
      organizations.push(org)
      await organizationRepository.create(org)
    }

    petRepository = new InMemoryPetRepository()
    sutUseCase = new FetchPetsUseCase(petRepository, organizationRepository)

    for (let index = 0; index < 55; index++) {
      pet = Pet.create({
        organizationId: organizations[index % 10].id,
        name: faker.person.firstName(),
        description: faker.animal.dog(),
        age: faker.helpers.arrayElement([
          'Filhote',
          'Jovem',
          'Adulto',
          'Idoso',
        ]),
        size: faker.helpers.arrayElement(['Pequenino', 'Médio', 'Alto']),
        energy: faker.helpers.arrayElement(['Baixa', 'Média', 'Alta']),
        independence: faker.helpers.arrayElement(['Baixo', 'Médio', 'Alto']),
        environment: faker.helpers.arrayElement([
          'Amplo',
          'Balanceado',
          'Restrito',
        ]),
        adoptionRequirements: null,
        images: null,
      })
      await petRepository.create(pet)
    }
  })

  it('Should be able to fetch pets in a specific city', async () => {
    const output = await sutUseCase.execute({ city: 'São Paulo' })
    expect(output.pets.length).toBe(28)
  })

  it('Should be able to fetch pets in a specific city with size filter', async () => {
    const output = await sutUseCase.execute({
      city: 'São Paulo',
      size: 'Pequenino',
    })
    expect(output.pets.length).toBeLessThan(28)
    expect(() =>
      output.pets.forEach((pet) => pet.size === 'Pequenino'),
    ).toBeTruthy()
  })

  it('Should be able to fetch pets in a specific city with size and age filter', async () => {
    const output = await sutUseCase.execute({
      city: 'São Paulo',
      size: 'Pequenino',
      age: 'Adulto',
    })
    expect(output.pets.length).toBeLessThan(28)
    expect(() =>
      output.pets.forEach(
        (pet) => pet.size === 'Pequenino' && pet.age === 'Adulto',
      ),
    ).toBeTruthy()
  })

  it('Should be able to fetch pets in a specific city with size, age and energy filter', async () => {
    const output = await sutUseCase.execute({
      city: 'São Paulo',
      size: 'Pequenino',
      age: 'Adulto',
      energy: 'Baixa',
    })
    expect(output.pets.length).toBeLessThan(28)
    expect(() =>
      output.pets.forEach(
        (pet) =>
          pet.size === 'Pequenino' &&
          pet.age === 'Adulto' &&
          pet.energy === 'Baixa',
      ),
    ).toBeTruthy()
  })
  it('Should be able to fetch pets in a specific city with size, age, energy and environment filter', async () => {
    const output = await sutUseCase.execute({
      city: 'São Paulo',
      size: 'Pequenino',
      age: 'Adulto',
      energy: 'Baixa',
      environment: 'Amplo',
    })
    expect(output.pets.length).toBeLessThan(28)
    expect(() =>
      output.pets.forEach(
        (pet) =>
          pet.size === 'Pequenino' &&
          pet.age === 'Adulto' &&
          pet.energy === 'Baixa' &&
          pet.environment === 'Amplo',
      ),
    ).toBeTruthy()
  })
  it('Should be able to fetch pets in a specific city with size, age, energy, independence and environment filter', async () => {
    const output = await sutUseCase.execute({
      city: 'São Paulo',
      size: 'Pequenino',
      age: 'Adulto',
      energy: 'Baixa',
      environment: 'Amplo',
      independence: 'Baixo',
    })
    expect(output.pets.length).toBeLessThan(28)
    expect(() =>
      output.pets.forEach(
        (pet) =>
          pet.size === 'Pequenino' &&
          pet.age === 'Adulto' &&
          pet.energy === 'Baixa' &&
          pet.environment === 'Amplo' &&
          pet.independence === 'Baixo',
      ),
    ).toBeTruthy()
  })
})
