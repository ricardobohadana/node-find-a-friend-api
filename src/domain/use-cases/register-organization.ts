import { hash } from 'bcryptjs'
import { IOrganizationRepository } from '../interfaces/repositories/organization'
import { UseCase } from './base/use-case'
import { Organization } from '../entities/organization'
import { EntityConflictError } from '../errors/entity-conflict'

export interface RegisterOrganizationUseCaseProps {
  personName: string
  email: string
  cep: string
  address: string
  city: string
  state: string
  phoneNumber: string
  password: string
}

interface RegisterOrganizationUseCaseOutput {}

export class RegisterOrganizationUseCase
  implements
    UseCase<
      RegisterOrganizationUseCaseProps,
      RegisterOrganizationUseCaseOutput
    >
{
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  public async execute({
    email,
    address,
    cep,
    city,
    state,
    password,
    personName,
    phoneNumber,
  }: RegisterOrganizationUseCaseProps): Promise<RegisterOrganizationUseCaseOutput> {
    const existingOrg =
      await this.organizationRepository.getByEmailOrPhoneNumber({
        email,
        phoneNumber,
      })

    if (existingOrg) throw new EntityConflictError('Organization')

    if (!cep || !cep.trim()) throw new Error('Cep inválido')
    if (!city || !city.trim()) throw new Error('Cidade inválida')
    if (!state || !state.trim()) throw new Error('Estado inválido')

    const hashedPassword = await hash(password, 10)

    const organization = Organization.create({
      city,
      state,
      address,
      cep,
      email,
      password: hashedPassword,
      personName,
      phoneNumber,
    })

    this.organizationRepository.create(organization)

    return {}
  }
}
