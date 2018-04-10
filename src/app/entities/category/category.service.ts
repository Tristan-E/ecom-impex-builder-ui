import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Category } from './category.model';
import { createRequestOption } from '../../shared/model/request-util';
import { SERVER_API_URL } from '../../app.constants'

export type EntityResponseType = HttpResponse<Category>;

@Injectable()
export class CategoryService {

  private resourceUrl = SERVER_API_URL + 'categories';

  constructor(private http: HttpClient) {
  }

  create(category: Category): Observable<EntityResponseType> {
    const copy = this.convert(category);
    return this.http.post<Category>(this.resourceUrl, copy, { observe: 'response' });
  }

  update(category: Category): Observable<EntityResponseType> {
    const copy = this.convert(category);
    return this.http.put<Category>(this.resourceUrl, copy, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<Category>(`${this.resourceUrl}/${id}`, { observe: 'response'});
  }

  findByCategoryType(categoryType: string): Observable<HttpResponse<Category[]>> {
    return this.http.get<Category[]>(`${this.resourceUrl}/type/${categoryType}`, { observe: 'response'});
  }

  query(req?: any): Observable<HttpResponse<Category[]>> {
    const options = createRequestOption(req);
    return this.http.get<Category[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
  }

  /**
   * Convert a Category to a JSON which can be sent to the server.
   */
  private convert(category: Category): Category {
    const copy: Category = Object.assign({}, category);
    return copy;
  }
}
