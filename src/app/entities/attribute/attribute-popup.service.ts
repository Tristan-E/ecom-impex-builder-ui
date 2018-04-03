import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Attribute } from './attribute.model';
import { AttributeService } from './attribute.service';

@Injectable()
export class AttributePopupService {
  private ngbModalRef: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private attributeService: AttributeService

  ) {
    this.ngbModalRef = null;
  }

  open(component: Component, id?: number | any): Promise<NgbModalRef> {
    return new Promise<NgbModalRef>((resolve, reject) => {
      const isOpen = this.ngbModalRef !== null;
      if (isOpen) {
        resolve(this.ngbModalRef);
      }

      if (id) {
        this.attributeService.find(id)
          .subscribe((attributeResponse: HttpResponse<Attribute>) => {
            const attribute: Attribute = attributeResponse.body;
            this.ngbModalRef = this.attributeModalRef(component, attribute);
            resolve(this.ngbModalRef);
          });
      } else {
        // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
          this.ngbModalRef = this.attributeModalRef(component, new Attribute());
          resolve(this.ngbModalRef);
        }, 0);
      }
    });
  }

  attributeModalRef(component: Component, attribute: Attribute): NgbModalRef {
    const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.attribute = attribute;
    modalRef.result.then((result) => {
      this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
      this.ngbModalRef = null;
    }, (reason) => {
      this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
      this.ngbModalRef = null;
    });
    return modalRef;
  }
}
