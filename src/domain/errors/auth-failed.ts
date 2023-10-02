export class AuthFailedError extends Error {
  constructor() {
    super('Authentication failed')
    this.name = 'AuthFailedError'
  }
}
