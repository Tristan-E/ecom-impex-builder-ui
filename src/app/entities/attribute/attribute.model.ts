import {BaseEntity} from '../../shared/model/base-entity';
import {AttributeValue} from '../attribute-value/attribute-value.model';

export class Attribute implements BaseEntity{
  constructor(
    public id?: number,
    public name?: string,
    public code?: string,
    public externalId?: string,
    public type?: string,
    public values?: AttributeValue[]
  ) {
  }
}
