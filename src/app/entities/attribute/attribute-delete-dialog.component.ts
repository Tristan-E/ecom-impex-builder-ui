import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from './../../shared/event-manager.service';

import { Attribute } from './attribute.model';
import { AttributePopupService } from './attribute-popup.service';
import { AttributeService } from './attribute.service';

@Component({
  selector: 'app-attribute-delete-dialog',
  templateUrl: './attribute-delete-dialog.component.html'
})
export class AttributeDeleteDialogComponent {

  label: Attribute;

  constructor(
    private attributeService: AttributeService,
    public activeModal: NgbActiveModal,
    private eventManager: EventManager
  ) {
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.attributeService.delete(id).subscribe((response) => {
      this.eventManager.broadcast({
        name: 'attributeListModification',
        content: 'Deleted an attribute'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'app-attribute-delete-popup',
  template: ''
})
export class AttributeDeletePopupComponent implements OnInit, OnDestroy {

  routeSub: any;

  constructor(
    private route: ActivatedRoute,
    private attributePopupService: AttributePopupService
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.attributePopupService
        .open(AttributeDeleteDialogComponent as Component, params['id']);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
