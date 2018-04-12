import { Component, OnInit } from '@angular/core';
import { TreeService } from './tree.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { TreeNode } from './tree-node.model';
import { Category } from '../entities/category/category.model';
import { CategoryService } from '../entities/category/category.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{
  nodes: TreeNode[];
  universeCategories: Category[];
  options = {'allowDrag':'true'};

  universeCategoryId: number;
  isSaving: boolean;

  constructor(private treeService: TreeService, private categoryService: CategoryService) { }

  loadUniverseCategories() {
    // TODO USE CONSTANT
    this.categoryService.findByCategoryType('PU')
      .subscribe((categoryResponse: HttpResponse<Category[]>) => {
        this.universeCategories = categoryResponse.body;
      });
  }

  ngOnInit() {
    this.loadUniverseCategories();
  }

  private onError(error) {
    alert('OOPS, implement real alerting');
  }

  save() {
    this.isSaving = true;
    this.subscribeToSaveResponse(
      this.treeService.findByCategory(this.universeCategoryId)
    );
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<TreeNode>>) {
    result.subscribe(
      (res: HttpResponse<TreeNode>) => this.onSaveSuccess(res),
      (res: HttpErrorResponse) => this.onSaveError()
    );
  }

  private onSaveSuccess(res: HttpResponse<TreeNode>) {
    this.nodes = [res.body];
    this.isSaving = false;
  }

  private onSaveError() {
    alert('FAIL');
    this.isSaving = false;
  }
}
