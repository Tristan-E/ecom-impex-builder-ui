import {BaseEntity} from '../../shared/model/base-entity';

export class Category implements BaseEntity{
  constructor(
    public id?: number,
    public name?: string,
    public code?: string,
    public type?: string,
    public children?: Category[]
  ) {
  }
}
