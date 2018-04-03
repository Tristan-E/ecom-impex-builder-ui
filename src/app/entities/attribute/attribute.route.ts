import { Routes } from '@angular/router';
import { AttributeComponent } from './attribute.component';
import { AttributeDetailComponent } from './attribute-detail.component';
import { AttributePopupComponent } from './attribute-dialog.component';
import { AttributeDeletePopupComponent } from './attribute-delete-dialog.component';

export const attributeRoute: Routes = [
  {
    path: 'attribute',
    component: AttributeComponent,
    data: {
      pageTitle: 'Categories'
    }
  }, {
    path: 'attribute/:id',
    component: AttributeDetailComponent,
    data: {
      pageTitle: 'Attribute Detail'
    }
  }
];

export const attributePopupRoute: Routes = [
  {
    path: 'attribute-new',
    component: AttributePopupComponent,
    data: {
      pageTitle: 'New Attribute'
    },
    outlet: 'popup'
  },
  {
    path: 'attribute/:id/edit',
    component: AttributePopupComponent,
    data: {
      pageTitle: 'Edit attribute'
    },
    outlet: 'popup'
  },
  {
    path: 'attribute/:id/delete',
    component: AttributeDeletePopupComponent,
    data: {
      pageTitle: 'Delete Attribute'
    },
    outlet: 'popup'
  }
];
