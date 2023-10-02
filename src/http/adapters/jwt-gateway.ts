import { JwtGateway } from '../../domain/interfaces/gateways/jwt'
import { sign, verify } from 'jsonwebtoken'

export class JsonWebTokenGateway implements JwtGateway {
  constructor(private readonly secret: string) {}

  async sign(sub: string): Promise<string> {
    const token = sign({ sub }, this.secret)
    return token
  }

  async verify(token: string): Promise<string | null> {
    const payload = verify(token, this.secret)
    if (payload) return payload.sub as string
    else return null
  }
}
