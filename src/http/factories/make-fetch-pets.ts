import { knex } from '../../data/knex/config'
import { KnexOrganizationRepository } from '../../data/repositories/knex/organization'
import { KnexPetRepository } from '../../data/repositories/knex/pet'
import { FetchPetsUseCase } from '../../domain/use-cases/fetch-pets'

export function makeFetchPetsUseCase() {
  const petsRepository = new KnexPetRepository(knex)
  const organizationsRepository = new KnexOrganizationRepository(knex)
  return new FetchPetsUseCase(petsRepository, organizationsRepository)
}
