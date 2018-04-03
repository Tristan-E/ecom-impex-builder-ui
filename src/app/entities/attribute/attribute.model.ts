import {BaseEntity} from '../../shared/model/base-entity';

export class Attribute implements BaseEntity{
  constructor(
    public id?: number,
    public name?: string,
    public code?: string,
    public type?: string
  ) {
  }
}
