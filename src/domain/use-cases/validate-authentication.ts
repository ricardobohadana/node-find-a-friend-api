import { AuthFailedError } from '../errors/auth-failed'
import { JwtGateway } from '../interfaces/gateways/jwt'

interface Input {
  accessToken: string
}

interface Output {
  organizationId: string
}

export class ValidateAuthenticationUseCase {
  constructor(private readonly jwtGateway: JwtGateway) {}

  async execute({ accessToken }: Input): Promise<Output> {
    const organizationId = await this.jwtGateway.verify(accessToken)
    if (!organizationId) throw new AuthFailedError()
    return { organizationId }
  }
}
