import { Pet } from '../entities/pet'
import { IOrganizationRepository } from '../interfaces/repositories/organization'
import { IPetRepository } from '../interfaces/repositories/pet'
import { PetAge } from '../value-objects/pet-age'
import { PetEnergy } from '../value-objects/pet-energy'
import { PetEnvironment } from '../value-objects/pet-environment'
import { PetIndependence } from '../value-objects/pet-independence'
import { PetSize } from '../value-objects/pet-size'
import { UseCase } from './base/use-case'

interface Input {
  city: string
  age?: PetAge
  size?: PetSize
  energy?: PetEnergy
  independence?: PetIndependence
  environment?: PetEnvironment
}

interface Output {
  pets: Pet[]
}

export class FetchPetsUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly petRepository: IPetRepository,
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async execute({
    city,
    age,
    energy,
    environment,
    independence,
    size,
  }: Input): Promise<Output> {
    const organizations = await this.organizationRepository.findManyByCity(city)
    const organizationIds = organizations.map((o) => o.id)
    const pets = await this.petRepository.getAll({
      organizationId: organizationIds,
      age,
      energy,
      environment,
      independence,
      size,
    })
    return { pets }
  }
}
