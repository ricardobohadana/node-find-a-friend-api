import { Entity } from '../../../entities/base/entity'

export interface IBaseRepository<DomainEntity extends Entity> {
  get(id: string): Promise<DomainEntity | null>
  update(entity: DomainEntity): Promise<void>
  create(entity: DomainEntity): Promise<void>
  delete(id: string): Promise<void>
}
