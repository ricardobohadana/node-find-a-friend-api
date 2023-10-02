import { ZodError, z } from 'zod'
import { IReply } from '../../domain/ports/IReply'
import { IRequest, IRequestProperty } from '../../domain/ports/IRequest'
import { makeLoginOrganizationUseCase } from '../factories/make-login-organization'
import { AuthFailedError } from '../../domain/errors/auth-failed'

export class LoginOrganizationController {
  static async login(request: IRequest, reply: IReply) {
    const useCase = makeLoginOrganizationUseCase()
    const requestBodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    })
    try {
      const data = request.validate<z.infer<typeof requestBodySchema>>(
        IRequestProperty.BODY,
        requestBodySchema,
      )
      const { accessToken } = await useCase.execute(data)
      reply.statusCode(200)
      reply.setBody({ accessToken })
      reply.send()
    } catch (error) {
      if (error instanceof ZodError) {
        reply.statusCode(400)
        reply.setBody(error.format())
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
