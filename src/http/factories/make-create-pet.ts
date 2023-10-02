import { knex } from '../../data/knex/config'
import { KnexOrganizationRepository } from '../../data/repositories/knex/organization'
import { KnexPetRepository } from '../../data/repositories/knex/pet'
import { CreatePetUseCase } from '../../domain/use-cases/create-pet'

export function makeCreatePetUseCase() {
  const organizationRepository = new KnexOrganizationRepository(knex)
  const petRepository = new KnexPetRepository(knex)
  return new CreatePetUseCase(petRepository, organizationRepository)
}
