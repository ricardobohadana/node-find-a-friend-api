import { Entity } from '../../../entities/base/entity'
import { PetAge } from '../../../value-objects/pet-age'
import { PetEnergy } from '../../../value-objects/pet-energy'
import { PetEnvironment } from '../../../value-objects/pet-environment'
import { PetIndependence } from '../../../value-objects/pet-independence'
import { PetSize } from '../../../value-objects/pet-size'

export interface IBaseRepository<DomainEntity extends Entity> {
  get(id: string): Promise<DomainEntity | null>
  update(entity: DomainEntity): Promise<void>
  create(entity: DomainEntity): Promise<void>
  delete(id: string): Promise<void>
}
