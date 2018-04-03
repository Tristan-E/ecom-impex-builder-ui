import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from './../../shared/event-manager.service';

import { Category } from './category.model';
import { CategoryPopupService } from './category-popup.service';
import { CategoryService } from './category.service';
import { CategoryTypeService } from './category-type.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html'
})
export class CategoryDialogComponent implements OnInit {

  category: Category;
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
    console.log(error);
    alert('Error ! TODO : ' + error.message);
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
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
