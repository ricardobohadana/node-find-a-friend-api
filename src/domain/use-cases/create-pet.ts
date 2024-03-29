import { Pet } from '../entities/pet'
import { EntityNotFoundError } from '../errors/entity-not-found'
import { IOrganizationRepository } from '../interfaces/repositories/organization'
import { IPetRepository } from '../interfaces/repositories/pet'
import { UseCase } from './base/use-case'

export interface CreatePetUseCaseProps {
  organizationId: string
  name: string
  description: string
  age: 'Filhote' | 'Jovem' | 'Adulto' | 'Idoso'
  size: 'Pequenino' | 'Médio' | 'Alto'
  energy: 'Baixa' | 'Média' | 'Alta'
  independence: 'Baixo' | 'Médio' | 'Alto'
  environment: 'Amplo' | 'Balanceado' | 'Restrito'
  images?: string[]
  adoptionRequirements?: string[]
}

interface CreatePetUseCaseOutput {}

export class CreatePetUseCase
  implements UseCase<CreatePetUseCaseProps, CreatePetUseCaseOutput>
{
  constructor(
    private readonly petRepository: IPetRepository,
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  public async execute(
    props: CreatePetUseCaseProps,
  ): Promise<CreatePetUseCaseOutput> {
    const createProps = {
      ...props,
      images: props.images ?? null,
      adoptionRequirements: props.adoptionRequirements ?? null,
    }
    const organization = await this.organizationRepository.get(
      props.organizationId,
    )
    if (!organization)
      throw new EntityNotFoundError('Organization', props.organizationId)
    const pet = Pet.create(createProps)
    await this.petRepository.create(pet)
    return {}
  }
}
