/* eslint-disable no-unused-vars */
import { ZodObject, ZodSchema, z } from 'zod'

export enum IRequestProperty {
  BODY = 'body',
  PARAMS = 'params',
  QUERY = 'query',
  HEADERS = 'headers',
}

export interface IRequest {
  body: Record<string, any>
  params: Record<string, any>
  query: Record<string, any>
  headers: Record<string, any>

  validate<T>(property: IRequestProperty, schema: ZodSchema): T
  getBearerToken(): string
}
