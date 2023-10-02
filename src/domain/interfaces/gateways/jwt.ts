export interface JwtGateway {
  sign(sub: string): Promise<string>
  verify(token: string): Promise<string | null>
}
