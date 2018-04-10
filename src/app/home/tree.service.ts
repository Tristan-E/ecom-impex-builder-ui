import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TreeNode } from './tree-node.model';
import { SERVER_API_URL } from '../app.constants';

export type EntityResponseType = HttpResponse<TreeNode>;

@Injectable()
export class TreeService {

  private resourceUrl = SERVER_API_URL + 'tree';

  constructor(private http: HttpClient) {
  }

  findByCategory(id: number): Observable<EntityResponseType> {
    return this.http.get<TreeNode>(`${this.resourceUrl}/${id}`, { observe: 'response'});
  }

}
