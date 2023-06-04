import { Pet } from '../../../domain/entities/pet'
import { IPetRepository } from '../../../domain/interfaces/repositories/pet'

export class InMemoryPetRepository implements IPetRepository {
  pets: Pet[]
  constructor() {
    this.pets = []
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
