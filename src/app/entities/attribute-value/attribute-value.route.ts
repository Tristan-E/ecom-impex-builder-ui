import { Routes } from '@angular/router';
import { AttributeValueComponent } from './attribute-value.component';
import { AttributeValueDetailComponent } from './attribute-value-detail.component';
import { AttributeValuePopupComponent } from './attribute-value-dialog.component';
import { AttributeValueDeletePopupComponent } from './attribute-value-delete-dialog.component';

export const attributeValueRoute: Routes = [
  {
    path: 'attribute-value',
    component: AttributeValueComponent,
    data: {
      pageTitle: 'Attribute Values'
    }
  }, {
    path: 'attribute-value/:id',
    component: AttributeValueDetailComponent,
    data: {
      pageTitle: 'Attribute Value Detail'
    }
  }
];

export const attributeValuePopupRoute: Routes = [
  {
    path: 'attribute-value-new',
    component: AttributeValuePopupComponent,
    data: {
      pageTitle: 'New Attribute Value'
    },
    outlet: 'popup'
  },
  {
    path: 'attribute-value/:id/edit',
    component: AttributeValuePopupComponent,
    data: {
      pageTitle: 'Edit Attribute Value'
    },
    outlet: 'popup'
  },
  {
    path: 'attribute-value/:id/delete',
    component: AttributeValueDeletePopupComponent,
    data: {
      pageTitle: 'Delete Attribute Value'
    },
    outlet: 'popup'
  }
];
