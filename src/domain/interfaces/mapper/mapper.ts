export interface Mapper<DomainEntity, RecordEntity>{
  toDomain: (recordEntity: RecordEntity) => DomainEntity
  toRecord: (domainEntity: DomainEntity) => RecordEntity
}