import { Entity } from './base/entity'

interface PetProps {
  organizationId: string
  name: string
  description: string
  age: 'Filhote' | 'Jovem' | 'Adulto' | 'Idoso'
  size: 'Pequenino' | 'Médio' | 'Alto'
  energy: 'Baixa' | 'Média' | 'Alta'
  independence: 'Baixo' | 'Médio' | 'Alto'
  environment: 'Amplo' | 'Balanceado' | 'Restrito'
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

  get age() {
    return this.props.age
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

  get adoptionRequirements() {
    return this.props.adoptionRequirements
  }

  static create(props: PetProps, id?: string) {
    return new Pet(props, id)
  }
}
