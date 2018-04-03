import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppCategoryModule } from './category/category.module';
import { AppAttributeValueModule } from './attribute-value/attribute-value.module';

@NgModule({
  imports: [
    AppCategoryModule,
    AppAttributeValueModule
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppEntityModule {}
