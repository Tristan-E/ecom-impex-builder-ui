import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppSharedModule } from '../../shared/shared.module';
import { EventManager } from '../../shared/event-manager.service';

import {
  AttributeService,
  AttributeTypeService,
  AttributeComponent,
  AttributePopupService,
  AttributeDetailComponent,
  AttributeDialogComponent,
  AttributePopupComponent,
  AttributeDeletePopupComponent,
  AttributeDeleteDialogComponent,
  attributePopupRoute,
  attributeRoute
} from './';


const ENTITY_STATES = [
  ...attributeRoute,
  ...attributePopupRoute
];

@NgModule({
  imports: [
    AppSharedModule,
    RouterModule.forChild(ENTITY_STATES)
  ],
  declarations: [
    AttributeComponent,
    AttributeDetailComponent,
    AttributeDialogComponent,
    AttributePopupComponent,
    AttributeDeletePopupComponent,
    AttributeDeleteDialogComponent
  ],
  entryComponents: [
    AttributeComponent,
    AttributeDialogComponent,
    AttributePopupComponent,
    AttributeDeleteDialogComponent,
    AttributeDeletePopupComponent,
  ],
  providers: [
    AttributeService,
    AttributeTypeService,
    AttributePopupService,
    EventManager
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppAttributeModule {}
