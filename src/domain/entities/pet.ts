import { PetEnergy } from '../value-objects/pet-energy'
import { PetEnvironment } from '../value-objects/pet-environment'
import { PetIndependence } from '../value-objects/pet-independence'
import { PetSize } from '../value-objects/pet-size'
import { Entity } from './base/entity'

type PetAge = 'Filhote' | 'Jovem' | 'Adulto' | 'Idoso'

interface PetProps {
  organizationId: string
  name: string
  description: string
  age: PetAge
  size: PetSize
  energy: PetEnergy
  independence: PetIndependence
  environment: PetEnvironment
  images: string[] | null
  adoptionRequirements: string[] | null
}

export class Pet extends Entity<PetProps> {
  get organizationId() {
    return this.props.organizationId
  }

  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  set description(value: string) {
    if (value.length > 250) throw new Error('Description is too long')

    this.props.description = value
  }

  get age() {
    return this.props.age
  }

  public set age(value: PetAge) {
    this.props.age = value
  }

  get size() {
    return this.props.size
  }

  get energy() {
    return this.props.energy
  }

  get independence() {
    return this.props.independence
  }

  get environment() {
    return this.props.environment
  }

  get images() {
    return this.props.images
  }

  set images(value: string[] | null) {
    this.props.images = value
  }

  get adoptionRequirements() {
    return this.props.adoptionRequirements
  }

  set adoptionRequirements(value: string[] | null) {
    this.props.adoptionRequirements = value
  }

  static create(props: PetProps, id?: string) {
    if (props.description.length > 250)
      throw new Error('Description is too long')
    return new Pet(props, id)
  }
}
