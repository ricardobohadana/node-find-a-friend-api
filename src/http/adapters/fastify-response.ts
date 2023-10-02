import { IReply } from '../../domain/ports/IReply'
import { FastifyReply } from 'fastify'

export class FastifyResponse implements IReply {
  status: number
  body: Record<string, any>
  headers: Record<string, any>

  constructor(private readonly reply: FastifyReply) {
    this.status = -1
    this.body = {}
    this.headers = {}
  }

  statusCode(statusCode: number): void {
    if (statusCode > 100 || statusCode < 599) this.status = statusCode
    else throw new Error('Invalid status code')
  }

  setBody(body: object): void {
    this.body = body
  }

  setHeaders(headers: object): void {
    this.headers = headers
  }

  send(): void {
    if (this.status < 0) {
      throw new Error('Status code not set')
    }
    this.reply.headers(this.headers).status(this.status).send(this.body)
  }
}
