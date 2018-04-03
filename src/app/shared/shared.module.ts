import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppSharedCommonModule } from './shared-common.module';

@NgModule({
  imports: [
    AppSharedCommonModule
  ],
  declarations: [
  ],
  providers: [
  ],
  entryComponents: [],
  exports: [
    AppSharedCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppSharedModule {}
