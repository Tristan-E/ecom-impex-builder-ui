import {BaseEntity} from '../../shared/model/base-entity';

export class AttributeValue implements BaseEntity{
  constructor(
    public id?: number,
    public code?: string,
    public value?: string
  ) {
  }
}
