import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppSharedModule } from '../../shared/shared.module';
import { EventManager } from '../../shared/event-manager.service';

import {
  AttributeValueService,
  AttributeValueComponent,
  AttributeValuePopupService,
  AttributeValueDetailComponent,
  AttributeValueDialogComponent,
  AttributeValuePopupComponent,
  AttributeValueDeletePopupComponent,
  AttributeValueDeleteDialogComponent,
  attributeValuePopupRoute,
  attributeValueRoute
} from './';


const ENTITY_STATES = [
  ...attributeValueRoute,
  ...attributeValuePopupRoute
];

@NgModule({
  imports: [
    AppSharedModule,
    RouterModule.forChild(ENTITY_STATES)
  ],
  declarations: [
    AttributeValueComponent,
    AttributeValueDetailComponent,
    AttributeValueDialogComponent,
    AttributeValuePopupComponent,
    AttributeValueDeletePopupComponent,
    AttributeValueDeleteDialogComponent
  ],
  entryComponents: [
    AttributeValueComponent,
    AttributeValueDialogComponent,
    AttributeValuePopupComponent,
    AttributeValueDeleteDialogComponent,
    AttributeValueDeletePopupComponent,
  ],
  providers: [
    AttributeValueService,
    AttributeValuePopupService,
    EventManager
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppAttributeValueModule {}
