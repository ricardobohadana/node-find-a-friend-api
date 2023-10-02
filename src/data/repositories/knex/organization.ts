import { Knex } from 'knex'
import { Organization } from '../../../domain/entities/organization'
import { IOrganizationRepository } from '../../../domain/interfaces/repositories/organization'

export class KnexOrganizationRepository implements IOrganizationRepository {
  constructor(private readonly db: Knex) {}

  async getByEmailOrPhoneNumber(data: {
    email?: string | undefined
    phoneNumber?: string | undefined
  }): Promise<Organization | null> {
    if (!data.email && !data.phoneNumber) {
      throw new Error('Invalid data')
    }
    if (data.email) {
      return await this.db('organization').where('email', data.email).first()
    }
    return await this.db('organization')
      .where('phoneNumber', data.phoneNumber)
      .first()
  }

  async findManyByCity(city: string): Promise<Organization[]> {
    return await this.db('organization').where('city', city).select()
  }

  async get(id: string): Promise<Organization | null> {
    return await this.db('organization').where('id', id).first()
  }

  async update(entity: Organization): Promise<void> {
    await this.db('organization').where('id', entity.id).update({
      person_name: entity.personName,
      email: entity.email,
      phone_number: entity.phoneNumber,
      city: entity.city,
      cep: entity.cep,
      state: entity.state,
      address: entity.address,
      password: entity.password,
    })
  }

  async create(entity: Organization): Promise<void> {
    await this.db('organization').insert({
      id: entity.id,
      person_name: entity.personName,
      email: entity.email,
      phone_number: entity.phoneNumber,
      cep: entity.cep,
      city: entity.city,
      state: entity.state,
      address: entity.address,
      password: entity.password,
    })
  }

  async delete(id: string): Promise<void> {
    await this.db('organization').where('id', id).delete()
  }
}
