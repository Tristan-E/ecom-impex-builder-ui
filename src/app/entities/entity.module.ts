import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppCategoryModule } from './category/category.module';

@NgModule({
  imports: [
    AppCategoryModule
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppEntityModule {}
