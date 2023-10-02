import { knex } from '../../data/knex/config'
import { KnexOrganizationRepository } from '../../data/repositories/knex/organization'
import { RegisterOrganizationUseCase } from '../../domain/use-cases/register-organization'

export function makeRegisterOrganizationUseCase() {
  const repository = new KnexOrganizationRepository(knex)
  return new RegisterOrganizationUseCase(repository)
}
