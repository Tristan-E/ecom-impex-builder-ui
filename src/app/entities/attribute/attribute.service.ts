import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Attribute } from './attribute.model';
import { createRequestOption } from '../../shared/model/request-util';
import { SERVER_API_URL } from '../../app.constants'

export type EntityResponseType = HttpResponse<Attribute>;

@Injectable()
export class AttributeService {

  private resourceUrl = SERVER_API_URL + 'attributes';

  constructor(private http: HttpClient) {
  }

  create(attribute: Attribute): Observable<EntityResponseType> {
    const copy = this.convert(attribute);
    return this.http.post<Attribute>(this.resourceUrl, copy, { observe: 'response' });
  }

  update(attribute: Attribute): Observable<EntityResponseType> {
    const copy = this.convert(attribute);
    return this.http.put<Attribute>(this.resourceUrl, copy, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<Attribute>(`${this.resourceUrl}/${id}`, { observe: 'response'});
  }

  query(req?: any): Observable<HttpResponse<Attribute[]>> {
    const options = createRequestOption(req);
    return this.http.get<Attribute[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
  }

  /**
   * Convert a Attribute to a JSON which can be sent to the server.
   */
  private convert(attribute: Attribute): Attribute {
    const copy: Attribute = Object.assign({}, attribute);
    return copy;
  }
}
