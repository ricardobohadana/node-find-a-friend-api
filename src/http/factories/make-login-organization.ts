import { knex } from '../../data/knex/config'
import { KnexOrganizationRepository } from '../../data/repositories/knex/organization'
import { LoginOrganizationUseCase } from '../../domain/use-cases/login-organization'
import { env } from '../../env'
import { JsonWebTokenGateway } from '../adapters/jwt-gateway'

export function makeLoginOrganizationUseCase() {
  const jwtGateway = new JsonWebTokenGateway(env.JWT_SECRET)
  const organizationRepository = new KnexOrganizationRepository(knex)
  return new LoginOrganizationUseCase(organizationRepository, jwtGateway)
}
