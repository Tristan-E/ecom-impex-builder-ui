import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from './../../shared/event-manager.service';
import { FormControl } from '@angular/forms';

import { Category } from './category.model';
import { CategoryPopupService } from './category-popup.service';
import { CategoryService } from './category.service';
import { CategoryTypeService } from './category-type.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html'
})
export class CategoryDialogComponent implements OnInit {

  categoryControl: FormControl = new FormControl();
  category: Category;
  selectedCategory: Category;
  entries: Category[];
  filteredCategories: Observable<Category[]>;

  categoryTypes: string[];
  isSaving: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    //private jhiAlertService: JhiAlertService,
    private categoryService: CategoryService,
    private categoryTypeService: CategoryTypeService,
    private eventManager: EventManager
  ) {
  }

  ngOnInit() {
    this.isSaving = false;
    this.loadCategoryTypes();

    this.categoryService.query().subscribe(
      (res: HttpResponse<Category[]>) => {
        this.entries = res.body;

        this.filteredCategories = this.categoryControl.valueChanges
          .pipe(
            startWith(null),
            map(val => this.findCategoryByCodeOrName(val))
          );
      }
    );

  }

  findCategoryByCodeOrName(val: string): Category[] {
    const filteredList = this.entries.filter((c) => new RegExp(val, 'gi').test(c.code) || new RegExp(val, 'gi').test(c.name));
    // TODO error js  Expression changed after it has been checked
    if(filteredList != null) {
      this.selectedCategory = filteredList[0];
    }
    return filteredList;
  }

  addCategoryToChildren() {
    if(this.selectedCategory != null) {
      this.category.children.push(this.selectedCategory);
    }
  }

  compareCategory(c1: Category, c2: Category): boolean {
      return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  loadCategoryTypes() {
    this.categoryTypeService.query().subscribe(
      (res: HttpResponse<string[]>) => {
        this.categoryTypes = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }

  save() {
    this.isSaving = true;
    if (this.category.id !== undefined) {
      this.subscribeToSaveResponse(
        this.categoryService.update(this.category));
    } else {
      this.subscribeToSaveResponse(
        this.categoryService.create(this.category));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<Category>>) {
    result.subscribe((res: HttpResponse<Category>) =>
      this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess(result: Category) {
    this.eventManager.broadcast({ name: 'categoryListModification', content: 'OK'});
    this.isSaving = false;
    this.activeModal.dismiss(result);
  }

  private onSaveError() {
    this.isSaving = false;
  }

  private onError(error: any) {
    //this.jhiAlertService.error(error.message, null, null);
    alert('Error ! TODO : ' + error.message);
  }

  removeCategoryFromChildren(child) {
    if (this.category.children != null) {
      const index: number = this.category.children.indexOf(child);
      if (index !== -1) {
        this.category.children.splice(index, 1);
      }
    }
  }


}

@Component({
  selector: 'app-category-popup',
  template: ''
})
export class CategoryPopupComponent implements OnInit, OnDestroy {

  routeSub: any;

  constructor(
    private route: ActivatedRoute,
    private categoryPopupService: CategoryPopupService
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      if ( params['id'] ) {
        this.categoryPopupService
          .open(CategoryDialogComponent as Component, params['id']);
      } else {
        this.categoryPopupService
          .open(CategoryDialogComponent as Component);
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
