import { FastifyRequest as FRequest } from 'fastify'
import { IRequest, IRequestProperty } from '../../domain/ports/IRequest'
import { ZodSchema } from 'zod'

export class FastifyRequest implements IRequest {
  body: Record<string, any>
  params: Record<string, any>
  query: Record<string, any>
  headers: Record<string, any>

  constructor(request: FRequest) {
    this.body = request.body as Record<string, any>
    this.params = request.params as Record<string, any>
    this.query = request.query as Record<string, any>
    this.headers = request.headers as Record<string, any>
  }

  getBearerToken(): string {
    const authorizationHeader = this.headers.authorization
    if (!authorizationHeader) return ''
    const [bearer, token] = authorizationHeader.split(' ')
    if (bearer !== 'Bearer') return ''
    return token
  }

  validate<T>(property: IRequestProperty, zodSchema: ZodSchema): T {
    let props = this.body
    if (property === IRequestProperty.PARAMS) {
      props = this.params
    } else if (property === IRequestProperty.QUERY) {
      props = this.query
    } else if (property === IRequestProperty.HEADERS) {
      props = this.headers
    }
    const validatedSchemaData = zodSchema.parse(props)
    return validatedSchemaData
  }
}
