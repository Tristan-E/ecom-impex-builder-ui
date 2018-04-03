import { Routes } from '@angular/router';
import { CategoryComponent } from './category.component';
import { CategoryDetailComponent } from './category-detail.component';
import { CategoryPopupComponent } from './category-dialog.component';
import { CategoryDeletePopupComponent } from './category-delete-dialog.component';

export const categoryRoute: Routes = [
  {
    path: 'category',
    component: CategoryComponent,
    data: {
      pageTitle: 'Categories'
    }
  }, {
    path: 'category/:id',
    component: CategoryDetailComponent,
    data: {
      pageTitle: 'Category Detail'
    }
  }
];

export const categoryPopupRoute: Routes = [
  {
    path: 'category-new',
    component: CategoryPopupComponent,
    data: {
      pageTitle: 'New Category'
    },
    outlet: 'popup'
  },
  {
    path: 'category/:id/edit',
    component: CategoryPopupComponent,
    data: {
      pageTitle: 'Edit category'
    },
    outlet: 'popup'
  },
  {
    path: 'category/:id/delete',
    component: CategoryDeletePopupComponent,
    data: {
      pageTitle: 'Delete Category'
    },
    outlet: 'popup'
  }
];
