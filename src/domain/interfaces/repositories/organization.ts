import { Organization } from '../../entities/organization'
import { IBaseRepository } from './base/repository'

export interface IOrganizationRepository extends IBaseRepository<Organization> {
  getByEmailOrPhoneNumber(data: {
    email?: string
    phoneNumber?: string
  }): Promise<Organization | null>
}
