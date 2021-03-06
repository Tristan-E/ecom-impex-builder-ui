import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants'

@Injectable()
export class AttributeTypeService {

  private resourceUrl = SERVER_API_URL + 'attribute-types';

  constructor(private http: HttpClient) {
  }

  query(req?: any): Observable<HttpResponse<string[]>> {
    return this.http.get<string[]>(this.resourceUrl, { observe: 'response' });
  }
}
