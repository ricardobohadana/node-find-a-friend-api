import { Pet } from '../../entities/pet'
import { IBaseRepository } from './base/repository'

export interface IPetRepository extends IBaseRepository<Pet> {}
