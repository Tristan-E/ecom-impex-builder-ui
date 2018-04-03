import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from './../../shared/event-manager.service';

import { Attribute } from './attribute.model';
import { AttributePopupService } from './attribute-popup.service';
import { AttributeService } from './attribute.service';
import { AttributeTypeService } from './attribute-type.service';

@Component({
  selector: 'app-attribute-dialog',
  templateUrl: './attribute-dialog.component.html'
})
export class AttributeDialogComponent implements OnInit {

  attribute: Attribute;
  attributeTypes: string[];
  isSaving: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    //private jhiAlertService: JhiAlertService,
    private attributeService: AttributeService,
    private attributeTypeService: AttributeTypeService,
    private eventManager: EventManager
  ) {
  }

  ngOnInit() {
    this.isSaving = false;
    this.loadAttributeTypes();
  }

  loadAttributeTypes() {
    this.attributeTypeService.query().subscribe(
      (res: HttpResponse<string[]>) => {
        this.attributeTypes = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }

  save() {
    this.isSaving = true;
    if (this.attribute.id !== undefined) {
      this.subscribeToSaveResponse(
        this.attributeService.update(this.attribute));
    } else {
      this.subscribeToSaveResponse(
        this.attributeService.create(this.attribute));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<Attribute>>) {
    result.subscribe((res: HttpResponse<Attribute>) =>
      this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess(result: Attribute) {
    this.eventManager.broadcast({ name: 'attributeListModification', content: 'OK'});
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
  selector: 'app-attribute-popup',
  template: ''
})
export class AttributePopupComponent implements OnInit, OnDestroy {

  routeSub: any;

  constructor(
    private route: ActivatedRoute,
    private attributePopupService: AttributePopupService
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      if ( params['id'] ) {
        this.attributePopupService
          .open(AttributeDialogComponent as Component, params['id']);
      } else {
        this.attributePopupService
          .open(AttributeDialogComponent as Component);
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
