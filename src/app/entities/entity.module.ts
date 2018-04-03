import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppCategoryModule } from './category/category.module';
import { AppAttributeValueModule } from './attribute-value/attribute-value.module';
import { AppAttributeModule } from './attribute/attribute.module';

@NgModule({
  imports: [
    AppCategoryModule,
    AppAttributeValueModule,
    AppAttributeModule
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppEntityModule {}
