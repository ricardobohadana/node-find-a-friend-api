import { Knex } from 'knex'
import { Pet } from '../../../domain/entities/pet'
import { IPetRepository } from '../../../domain/interfaces/repositories/pet'
import { PetAge } from '../../../domain/value-objects/pet-age'
import { PetEnergy } from '../../../domain/value-objects/pet-energy'
import { PetEnvironment } from '../../../domain/value-objects/pet-environment'
import { PetIndependence } from '../../../domain/value-objects/pet-independence'
import { PetSize } from '../../../domain/value-objects/pet-size'

export class KnexPetRepository implements IPetRepository {
  constructor(private readonly db: Knex) {}

  async getAll(data: {
    organizationId?: string[] | undefined
    age?: PetAge | undefined
    size?: PetSize | undefined
    energy?: PetEnergy | undefined
    independence?: PetIndependence | undefined
    environment?: PetEnvironment | undefined
  }): Promise<Pet[]> {
    let query = this.db('pet')
    if (data.organizationId) {
      query = query.whereIn('organization_id', data.organizationId)
    }
    if (data.age) {
      query = query.where('age', data.age)
    }
    if (data.size) {
      query = query.where('size', data.size)
    }
    if (data.energy) {
      query = query.where('energy', data.energy)
    }
    if (data.independence) {
      query = query.where('independence', data.independence)
    }
    if (data.environment) {
      query = query.where('environment', data.environment)
    }
    const result = await query.select()
    return result as Pet[]
  }

  async get(id: string): Promise<Pet | null> {
    const result = await this.db('pet').where('id', id).first()
    console.log(result)
    return result as Pet | null
  }

  async update(entity: Pet): Promise<void> {
    await this.db('pet').where('id', entity.id).update({
      organization_id: entity.organizationId,
      name: entity.name,
      description: entity.description,
      age: entity.age,
      size: entity.size,
      energy: entity.energy,
      independence: entity.independence,
      environment: entity.environment,
      adoption_requirements: entity.adoptionRequirements,
      images: entity.images,
    })
  }

  async create(entity: Pet): Promise<void> {
    await this.db('pet').insert({
      id: entity.id,
      organization_id: entity.organizationId,
      name: entity.name,
      description: entity.description,
      age: entity.age,
      size: entity.size,
      energy: entity.energy,
      independence: entity.independence,
      environment: entity.environment,
      adoption_requirements: entity.adoptionRequirements,
      images: entity.images,
    })
  }

  async delete(id: string): Promise<void> {
    await this.db('pet').where('id', id).delete()
  }
}
