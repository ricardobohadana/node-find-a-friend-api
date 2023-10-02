export class EntityConflictError extends Error {
  constructor(entity: string) {
    super(`This ${entity} already exists`)
    this.name = 'EntityConflictError'
  }
} // Compare this snippet from src/domain/use-cases/register-organization.ts:
