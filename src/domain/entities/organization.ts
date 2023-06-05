import { Entity } from './base/entity'

interface OrganizationProps {
  personName: string
  email: string
  cep: string
  address: string
  phoneNumber: string
  password: string
}

export class Organization extends Entity<OrganizationProps> {
  static create(entityProps: OrganizationProps, id?: string) {
    return new Organization(entityProps, id)
  }

  get personName() {
    return this.props.personName
  }

  set personName(value: string) {
    this.props.personName = value
  }

  get email() {
    return this.props.email
  }

  get cep() {
    return this.props.cep
  }

  set cep(value: string) {
    this.props.cep = value
  }

  get address() {
    return this.props.address
  }

  set address(value: string) {
    this.props.address = value
  }

  get phoneNumber() {
    return this.props.phoneNumber
  }

  get password() {
    return this.props.password
  }
}
