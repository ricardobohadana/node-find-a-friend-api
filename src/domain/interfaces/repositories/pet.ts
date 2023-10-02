import { Pet } from '../../entities/pet'
import { PetAge } from '../../value-objects/pet-age'
import { PetEnergy } from '../../value-objects/pet-energy'
import { PetEnvironment } from '../../value-objects/pet-environment'
import { PetIndependence } from '../../value-objects/pet-independence'
import { PetSize } from '../../value-objects/pet-size'
import { IBaseRepository } from './base/repository'

export interface IPetRepository extends IBaseRepository<Pet> {
  getAll(data: {
    organizationId?: string[]
    age?: PetAge
    size?: PetSize
    energy?: PetEnergy
    independence?: PetIndependence
    environment?: PetEnvironment
  }): Promise<Pet[]>
}
