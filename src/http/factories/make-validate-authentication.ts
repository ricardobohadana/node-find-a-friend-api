import { ValidateAuthenticationUseCase } from '../../domain/use-cases/validate-authentication'
import { env } from '../../env'
import { JsonWebTokenGateway } from '../adapters/jwt-gateway'

export function makeValidateAuthenticationUseCase() {
  const jwtGateway = new JsonWebTokenGateway(env.JWT_SECRET)
  return new ValidateAuthenticationUseCase(jwtGateway)
}
