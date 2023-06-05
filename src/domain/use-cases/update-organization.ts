import { IOrganizationRepository } from '../interfaces/repositories/organization'
import { UseCase } from './base/use-case'
import { Organization } from '../entities/organization'

export interface UpdateOrganizationUseCaseProps {
  id: string
  personName?: string
  cep?: string
  address?: string
}

interface UpdateOrganizationUseCaseOutput {
  organization: Organization
}

export class UpdateOrganizationUseCase
  implements
    UseCase<UpdateOrganizationUseCaseProps, UpdateOrganizationUseCaseOutput>
{
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  public async execute({
    id,
    address,
    cep,
    personName,
  }: UpdateOrganizationUseCaseProps): Promise<UpdateOrganizationUseCaseOutput> {
    const organization = await this.organizationRepository.get(id)

    if (!organization) throw new Error('Entity not found')

    if (cep) organization.cep = cep
    if (address) organization.address = address
    if (personName) organization.personName = personName

    this.organizationRepository.update(organization)

    return {
      organization,
    }
  }
}
