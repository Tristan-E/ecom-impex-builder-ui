import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../app.constants';
import { ImpexBuilder } from './impex-builder.model';

export type EntityResponseType = HttpResponse<ImpexBuilder>;

@Injectable()
export class ImpexBuilderService {

  private resourceUrl = SERVER_API_URL + 'impex-builder';

  constructor(private http: HttpClient) {
  }

  build(impexBuilder: ImpexBuilder): Observable<EntityResponseType> {
    const copy = this.convert(impexBuilder);
    return this.http.post<ImpexBuilder>(this.resourceUrl, copy, { observe: 'response' });
  }

  /**
   * Convert a Category to a JSON which can be sent to the server.
   */
  private convert(impexBuilder: ImpexBuilder): ImpexBuilder{
    const copy: ImpexBuilder = Object.assign({}, impexBuilder);
    return copy;
  }

}
