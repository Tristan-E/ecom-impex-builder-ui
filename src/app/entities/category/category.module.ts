import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppSharedModule } from '../../shared/shared.module';
import { EventManager } from '../../shared/event-manager.service';

import {
  CategoryService,
  CategoryTypeService,
  CategoryComponent,
  CategoryPopupService,
  CategoryDetailComponent,
  CategoryDialogComponent,
  CategoryPopupComponent,
  CategoryDeletePopupComponent,
  CategoryDeleteDialogComponent,
  categoryPopupRoute,
  categoryRoute
} from './';


const ENTITY_STATES = [
  ...categoryRoute,
  ...categoryPopupRoute
];

@NgModule({
  imports: [
    AppSharedModule,
    RouterModule.forChild(ENTITY_STATES)
  ],
  declarations: [
    CategoryComponent,
    CategoryDetailComponent,
    CategoryDialogComponent,
    CategoryPopupComponent,
    CategoryDeletePopupComponent,
    CategoryDeleteDialogComponent
  ],
  entryComponents: [
    CategoryComponent,
    CategoryDialogComponent,
    CategoryPopupComponent,
    CategoryDeleteDialogComponent,
    CategoryDeletePopupComponent,
  ],
  providers: [
    CategoryService,
    CategoryTypeService,
    CategoryPopupService,
    EventManager
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppCategoryModule {}
