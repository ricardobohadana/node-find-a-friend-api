import { hash } from 'bcryptjs'
import { IOrganizationRepository } from '../interfaces/repositories/organization'
import { UseCase } from './base/use-case'
import { Organization } from '../entities/organization'

export interface RegisterOrganizationUseCaseProps {
  personName: string
  email: string
  cep: string
  address: string
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
    password,
    personName,
    phoneNumber,
  }: RegisterOrganizationUseCaseProps): Promise<RegisterOrganizationUseCaseOutput> {
    const existingOrg =
      await this.organizationRepository.getByEmailOrPhoneNumber({
        email,
        phoneNumber,
      })

    if (existingOrg) throw new Error('Email ou número de telefone inválido(s)')

    if (!cep || !cep.trim()) throw new Error('Cep inválido')

    const hashedPassword = await hash(password, 10)

    const organization = Organization.create({
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
