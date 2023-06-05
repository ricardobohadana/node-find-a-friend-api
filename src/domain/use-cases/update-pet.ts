import { Pet } from '../entities/pet'
import { IPetRepository } from '../interfaces/repositories/pet'
import { UseCase } from './base/use-case'

export interface UpdatePetUseCaseProps {
  id: string
  description?: string
  age?: 'Filhote' | 'Jovem' | 'Adulto' | 'Idoso'
  images?: string[]
  adoptionRequirements?: string[]
}

interface UpdatePetUseCaseOutput {
  pet: Pet
}

export class UpdatePetUseCase
  implements UseCase<UpdatePetUseCaseProps, UpdatePetUseCaseOutput>
{
  constructor(private readonly petRepository: IPetRepository) {}

  public async execute({
    id,
    age,
    description,
    adoptionRequirements,
    images,
  }: UpdatePetUseCaseProps): Promise<UpdatePetUseCaseOutput> {
    const pet = await this.petRepository.get(id)
    if (!pet) throw new Error('Entity not found')

    if (age) pet.age = age
    if (description) pet.description = description
    if (adoptionRequirements) pet.adoptionRequirements = adoptionRequirements
    if (images) pet.images = images

    await this.petRepository.update(pet)
    return {
      pet,
    }
  }
}
