import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from './../../shared/event-manager.service';

import { Category } from './category.model';
import { CategoryPopupService } from './category-popup.service';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category-delete-dialog',
  templateUrl: './category-delete-dialog.component.html'
})
export class CategoryDeleteDialogComponent {

  label: Category;

  constructor(
    private categoryService: CategoryService,
    public activeModal: NgbActiveModal,
    private eventManager: EventManager
  ) {
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.categoryService.delete(id).subscribe((response) => {
      this.eventManager.broadcast({
        name: 'categoryListModification',
        content: 'Deleted a category'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'app-category-delete-popup',
  template: ''
})
export class CategoryDeletePopupComponent implements OnInit, OnDestroy {

  routeSub: any;

  constructor(
    private route: ActivatedRoute,
    private categoryPopupService: CategoryPopupService
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.categoryPopupService
        .open(CategoryDeleteDialogComponent as Component, params['id']);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
