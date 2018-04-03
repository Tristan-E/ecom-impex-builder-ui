import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AttributeValue } from './attribute-value.model';
import { createRequestOption } from '../../shared/model/request-util';
import { SERVER_API_URL } from '../../app.constants'

export type EntityResponseType = HttpResponse<AttributeValue>;

@Injectable()
export class AttributeValueService {

  private resourceUrl = SERVER_API_URL + 'attribute-values';

  constructor(private http: HttpClient) {
  }

  create(attributeValue: AttributeValue): Observable<EntityResponseType> {
    const copy = this.convert(attributeValue);
    return this.http.post<AttributeValue>(this.resourceUrl, copy, { observe: 'response' });
  }

  update(attributeValue: AttributeValue): Observable<EntityResponseType> {
    const copy = this.convert(attributeValue);
    return this.http.put<AttributeValue>(this.resourceUrl, copy, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<AttributeValue>(`${this.resourceUrl}/${id}`, { observe: 'response'});
  }

  query(req?: any): Observable<HttpResponse<AttributeValue[]>> {
    const options = createRequestOption(req);
    return this.http.get<AttributeValue[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
  }

  /**
   * Convert a AttributeValue to a JSON which can be sent to the server.
   */
  private convert(attributeValue: AttributeValue): AttributeValue {
    const copy: AttributeValue = Object.assign({}, attributeValue);
    return copy;
  }
}
