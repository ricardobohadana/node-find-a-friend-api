import { Organization } from '../../../domain/entities/organization'
import { IOrganizationRepository } from '../../../domain/interfaces/repositories/organization'

export class InMemoryOrganizationRepository implements IOrganizationRepository {
  organizations: Organization[]
  constructor() {
    this.organizations = []
  }

  async findManyByCity(city: string): Promise<Organization[]> {
    return this.organizations.filter((o) => o.city === city)
  }

  async getByEmailOrPhoneNumber({
    email,
    phoneNumber,
  }: {
    email?: string | undefined
    phoneNumber?: string | undefined
  }): Promise<Organization | null> {
    return (
      this.organizations.find(
        (o) =>
          (email && o.email === email) ||
          (phoneNumber && o.phoneNumber === phoneNumber),
      ) ?? null
    )
  }

  public async get(id: string): Promise<Organization | null> {
    return this.organizations.find((p) => p.id === id) ?? null
  }

  public async update(entity: Organization): Promise<void> {
    this.organizations = this.organizations.filter((p) => p.id !== entity.id)
    this.organizations.push(entity)
  }

  public async create(entity: Organization): Promise<void> {
    this.organizations.push(entity)
  }

  public async delete(id: string): Promise<void> {
    this.organizations = this.organizations.filter((p) => p.id !== id)
  }
}
