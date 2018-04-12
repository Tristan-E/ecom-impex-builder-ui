import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from './../../shared/event-manager.service';

import { Attribute } from './attribute.model';
import { AttributePopupService } from './attribute-popup.service';
import { AttributeService } from './attribute.service';
import { AttributeTypeService } from './attribute-type.service';
import { AttributeValue } from '../attribute-value/attribute-value.model';
import { AttributeValueService } from '../attribute-value/attribute-value.service';

@Component({
  selector: 'app-attribute-dialog',
  templateUrl: './attribute-dialog.component.html'
})
export class AttributeDialogComponent implements OnInit {

  attribute: Attribute;
  attributeTypes: string[];

  attributeValueControl: FormControl = new FormControl();
  selectedAttributeValue: AttributeValue;
  attributeValues: AttributeValue[];
  isSaving: boolean;

  filteredAttributeValues: Observable<AttributeValue[]>;

  constructor(
    public activeModal: NgbActiveModal,
    //private jhiAlertService: JhiAlertService,
    private attributeService: AttributeService,
    private attributeTypeService: AttributeTypeService,
    private attributeValueService: AttributeValueService,
    private eventManager: EventManager
  ) {
  }

  ngOnInit() {
    this.isSaving = false;
    this.loadAttributeTypes();

    this.attributeValueService.query().subscribe(
      (res: HttpResponse<AttributeValue[]>) => {
        this.attributeValues = res.body;

        this.filteredAttributeValues = this.attributeValueControl.valueChanges
          .pipe(
            startWith(null),
            map(val => this.findAttributeValueByCodeOrName(val))
          );
      }
    );
  }

  findAttributeValueByCodeOrName(val: string): AttributeValue[] {
    const filteredList = this.attributeValues.filter((a) => new RegExp(val, 'gi').test(a.code) || new RegExp(val, 'gi').test(a.value));
    // TODO error js  Expression changed after it has been checked
    if(filteredList != null) {
      this.selectedAttributeValue= filteredList[0];
    }
    return filteredList;
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
    console.log('save');
    this.isSaving = true;
    if (this.attribute.id !== undefined) {
      this.subscribeToSaveResponse(
        this.attributeService.update(this.attribute));
    } else {
      this.subscribeToSaveResponse(
        this.attributeService.create(this.attribute));
    }
  }

  removeAttributeValue(attributeValue) {
    if (this.attribute.values!= null) {
      const index: number = this.attribute.values.indexOf(attributeValue);
      if (index !== -1) {
        this.attribute.values.splice(index, 1);
      }
    }
  }

  addAttributeValue() {
    if(this.selectedAttributeValue != null) {
      this.attribute.values.push(this.selectedAttributeValue);
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

  compareAttributeValue(a1: AttributeValue, a2: AttributeValue): boolean {
    return a1 && a2 ? a1.id === a2.id : a1 === a2;
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
