import { Pet } from '../../../domain/entities/pet'
import { IPetRepository } from '../../../domain/interfaces/repositories/pet'
import { PetAge } from '../../../domain/value-objects/pet-age'
import { PetEnergy } from '../../../domain/value-objects/pet-energy'
import { PetEnvironment } from '../../../domain/value-objects/pet-environment'
import { PetIndependence } from '../../../domain/value-objects/pet-independence'
import { PetSize } from '../../../domain/value-objects/pet-size'

export class InMemoryPetRepository implements IPetRepository {
  pets: Pet[]
  constructor() {
    this.pets = []
  }

  async getAll(data: {
    organizationId: string[]
    age?: PetAge
    size?: PetSize
    energy?: PetEnergy
    independence?: PetIndependence
    environment?: PetEnvironment
  }): Promise<Pet[]> {
    const { organizationId, age, energy, environment, independence, size } =
      data
    let pets = [...this.pets]
    pets = pets.filter((p) => organizationId.includes(p.organizationId))
    if (age) {
      pets = pets.filter((p) => p.age === age)
    }
    if (energy) {
      pets = pets.filter((p) => p.energy === energy)
    }
    if (environment) {
      pets = pets.filter((p) => p.environment === environment)
    }
    if (independence) {
      pets = pets.filter((p) => p.independence === independence)
    }
    if (size) {
      pets = pets.filter((p) => p.size === size)
    }
    return pets
  }

  public async get(id: string): Promise<Pet | null> {
    return this.pets.find((p) => p.id === id) ?? null
  }

  public async update(entity: Pet): Promise<void> {
    this.pets = this.pets.filter((p) => p.id !== entity.id)
    this.pets.push(entity)
  }

  public async create(entity: Pet): Promise<void> {
    this.pets.push(entity)
  }

  public async delete(id: string): Promise<void> {
    this.pets = this.pets.filter((p) => p.id !== id)
  }
}
