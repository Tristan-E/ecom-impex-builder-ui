import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from './../../shared/event-manager.service';

import { AttributeValue } from './attribute-value.model';
import { AttributeValuePopupService } from './attribute-value-popup.service';
import { AttributeValueService } from './attribute-value.service';

@Component({
  selector: 'app-attribute-value-dialog',
  templateUrl: './attribute-value-dialog.component.html'
})
export class AttributeValueDialogComponent implements OnInit {

  attributeValue: AttributeValue;
  isSaving: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    //private jhiAlertService: JhiAlertService,
    private attributeValueService: AttributeValueService,
    private eventManager: EventManager
  ) {
  }

  ngOnInit() {
    this.isSaving = false;
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }

  save() {
    this.isSaving = true;
    if (this.attributeValue.id !== undefined) {
      this.subscribeToSaveResponse(
        this.attributeValueService.update(this.attributeValue));
    } else {
      this.subscribeToSaveResponse(
        this.attributeValueService.create(this.attributeValue));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<AttributeValue>>) {
    result.subscribe((res: HttpResponse<AttributeValue>) =>
      this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess(result: AttributeValue) {
    this.eventManager.broadcast({ name: 'attributeValueListModification', content: 'OK'});
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
  selector: 'app-attribute-value-popup',
  template: ''
})
export class AttributeValuePopupComponent implements OnInit, OnDestroy {

  routeSub: any;

  constructor(
    private route: ActivatedRoute,
    private attributeValuePopupService: AttributeValuePopupService
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      if ( params['id'] ) {
        this.attributeValuePopupService
          .open(AttributeValueDialogComponent as Component, params['id']);
      } else {
        this.attributeValuePopupService
          .open(AttributeValueDialogComponent as Component);
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
