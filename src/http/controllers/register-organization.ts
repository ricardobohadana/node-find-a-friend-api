import { ZodError, z } from 'zod'
import { makeRegisterOrganizationUseCase } from '../factories/make-register-organization'
import { IReply } from '../../domain/ports/IReply'
import { IRequest, IRequestProperty } from '../../domain/ports/IRequest'
import { EntityConflictError } from '../../domain/errors/entity-conflict'

export class RegisterOrganizationController {
  static async register(request: IRequest, reply: IReply) {
    const useCase = makeRegisterOrganizationUseCase()
    const requestBodySchema = z.object({
      personName: z.string(),
      email: z.string().email(),
      phoneNumber: z.string(),
      cep: z.string(),
      city: z.string(),
      state: z.string(),
      address: z.string(),
      password: z.string(),
    })
    try {
      const data = request.validate<z.infer<typeof requestBodySchema>>(
        IRequestProperty.BODY,
        requestBodySchema,
      )
      await useCase.execute(data)
      reply.statusCode(201)
      reply.setBody({ message: 'Organization created successfully' })
      reply.send()
    } catch (error) {
      if (error instanceof ZodError) {
        reply.statusCode(400)
        reply.setBody(error.format())
        reply.send()
        return
      }
      if (error instanceof EntityConflictError) {
        reply.statusCode(409)
        reply.setBody({ error: error.message })
        reply.send()
        return
      }
      console.log(error)
      reply.statusCode(500)
      reply.setBody({ error: 'Internal Server Error' })
      reply.send()
    }
  }
}
