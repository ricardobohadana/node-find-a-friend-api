export interface IReply {
  statusCode(statusCode: number): void
  setBody(body: object): void
  setHeaders(headers: object): void
  send(): void
}
