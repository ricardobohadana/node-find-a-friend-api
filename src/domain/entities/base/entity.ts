import { randomUUID } from 'crypto'

export abstract class Entity<Props = any> {
  protected props: Props
  private _id: string

  public get id() {
    return this._id
  }

  protected constructor(props: Props, id?: string) {
    this.props = props
    this._id = id ?? randomUUID()
  }
}
