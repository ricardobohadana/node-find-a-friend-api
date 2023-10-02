import { ZodError, z } from 'zod'
import { IReply } from '../../domain/ports/IReply'
import { IRequest, IRequestProperty } from '../../domain/ports/IRequest'
import { makeCreatePetUseCase } from '../factories/make-create-pet'
import { EntityNotFoundError } from '../../domain/errors/entity-not-found'
import { makeValidateAuthenticationUseCase } from '../factories/make-validate-authentication'
import { AuthFailedError } from '../../domain/errors/auth-failed'

export class CreatePetController {
  static async create(request: IRequest, reply: IReply) {
    const validateAuthUseCase = makeValidateAuthenticationUseCase()
    const useCase = makeCreatePetUseCase()
    const requestBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      age: z.enum(['Filhote', 'Adulto', 'Idoso']),
      size: z.enum(['Pequenino', 'Médio', 'Alto']),
      energy: z.enum(['Baixa', 'Média', 'Alta']),
      independence: z.enum(['Baixo', 'Médio', 'Alto']),
      environment: z.enum(['Amplo', 'Balanceado', 'Restrito']),
    })
    try {
      const { organizationId } = await validateAuthUseCase.execute({
        accessToken: request.getBearerToken(),
      })
      const data = request.validate<z.infer<typeof requestBodySchema>>(
        IRequestProperty.BODY,
        requestBodySchema,
      )
      const useCaseData = {
        ...data,
        organizationId,
      }
      await useCase.execute(useCaseData)
      reply.statusCode(201)
      reply.setBody({ message: 'Pet criado com sucesso!' })
      reply.send()
    } catch (error) {
      if (error instanceof ZodError) {
        reply.statusCode(400)
        reply.setBody(error.format())
        reply.send()
        return
      }
      if (error instanceof EntityNotFoundError) {
        reply.statusCode(404)
        reply.setBody({ error: error.message })
        reply.send()
        return
      }
      if (error instanceof AuthFailedError) {
        reply.statusCode(401)
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
