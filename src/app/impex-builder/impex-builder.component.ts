import { Component, OnInit } from '@angular/core';
import { ImpexBuilder } from './impex-builder.model';
import { Category } from '../entities/category/category.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { CategoryService } from '../entities/category/category.service';
import { ImpexBuilderService } from './impex-builder.service';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-impex-builder',
  templateUrl: './impex-builder.component.html'
})
export class ImpexBuilderComponent implements OnInit {
  impexBuilder: ImpexBuilder;
  universeCategories: Category[];

  isSaving: boolean;

  constructor(
    private categoryService: CategoryService,
    private impexBuilderService: ImpexBuilderService,
  ) {
  }

  ngOnInit() {
    this.impexBuilder = new ImpexBuilder();
    this.loadUniverseCategories();
  }

  loadUniverseCategories() {
    // TODO USE CONSTANT
    this.categoryService.findByCategoryType('PU')
      .subscribe((categoryResponse: HttpResponse<Category[]>) => {
        this.universeCategories = categoryResponse.body;
      });
  }

  save() {
    this.isSaving = true;
    this.subscribeToSaveResponse(
      this.impexBuilderService.build(this.impexBuilder)
    );
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<ImpexBuilder>>) {
    result.subscribe((res: HttpResponse<ImpexBuilder>) =>
      this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess() {
    alert('IT WORKS');
    this.isSaving = false;
  }

  private onSaveError() {
    alert('FAIL');
    this.isSaving = false;
  }
}
