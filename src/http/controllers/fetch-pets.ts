import { ZodError, z } from 'zod'
import { makeFetchPetsUseCase } from '../factories/make-fetch-pets'
import { IReply } from '../../domain/ports/IReply'
import { IRequest, IRequestProperty } from '../../domain/ports/IRequest'

export class FetchPetsController {
  static async fetch(request: IRequest, reply: IReply) {
    const useCase = makeFetchPetsUseCase()
    const requestQuerySchema = z.object({
      city: z.string(),
      age: z.enum(['Filhote', 'Adulto', 'Idoso']).optional(),
      size: z.enum(['Pequenino', 'Médio', 'Alto']).optional(),
      energy: z.enum(['Baixa', 'Média', 'Alta']).optional(),
      independence: z.enum(['Baixo', 'Médio', 'Alto']).optional(),
      environment: z.enum(['Amplo', 'Balanceado', 'Restrito']).optional(),
    })
    try {
      const data = request.validate<z.infer<typeof requestQuerySchema>>(
        IRequestProperty.QUERY,
        requestQuerySchema,
      )
      const { pets } = await useCase.execute(data)
      reply.statusCode(200)
      reply.setBody({ pets })
      reply.send()
    } catch (error) {
      if (error instanceof ZodError) {
        reply.statusCode(400)
        reply.setBody(error.format())
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
