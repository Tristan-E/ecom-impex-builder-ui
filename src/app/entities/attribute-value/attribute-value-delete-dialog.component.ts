import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from './../../shared/event-manager.service';

import { AttributeValue } from './attribute-value.model';
import { AttributeValuePopupService } from './attribute-value-popup.service';
import { AttributeValueService } from './attribute-value.service';

@Component({
  selector: 'app-attribute-value-delete-dialog',
  templateUrl: './attribute-value-delete-dialog.component.html'
})
export class AttributeValueDeleteDialogComponent {

  label: AttributeValue;

  constructor(
    private attributeValueService: AttributeValueService,
    public activeModal: NgbActiveModal,
    private eventManager: EventManager
  ) {
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.attributeValueService.delete(id).subscribe((response) => {
      this.eventManager.broadcast({
        name: 'attributeValueListModification',
        content: 'Deleted an attribute value'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'app-attribute-value-delete-popup',
  template: ''
})
export class AttributeValueDeletePopupComponent implements OnInit, OnDestroy {

  routeSub: any;

  constructor(
    private route: ActivatedRoute,
    private attributeValuePopupService: AttributeValuePopupService
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.attributeValuePopupService
        .open(AttributeValueDeleteDialogComponent as Component, params['id']);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
