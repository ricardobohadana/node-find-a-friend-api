import { compare } from 'bcryptjs'
import { AuthFailedError } from '../errors/auth-failed'
import { IOrganizationRepository } from '../interfaces/repositories/organization'
import { UseCase } from './base/use-case'
import { JwtGateway } from '../interfaces/gateways/jwt'

interface Input {
  email: string
  password: string
}

interface Output {
  accessToken: string
}

export class LoginOrganizationUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
    private readonly jwtGateway: JwtGateway,
  ) {}

  async execute({ email, password }: Input): Promise<Output> {
    const organization =
      await this.organizationRepository.getByEmailOrPhoneNumber({
        email,
      })
    if (!organization) throw new AuthFailedError()

    const passwordMatches = await compare(password, organization.password)

    if (!passwordMatches) throw new AuthFailedError()

    return {
      accessToken: await this.jwtGateway.sign(organization.id),
    }
  }
}
