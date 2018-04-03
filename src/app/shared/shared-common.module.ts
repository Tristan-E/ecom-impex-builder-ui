import { NgModule } from '@angular/core';

import {
  AppSharedLibsModule
} from './';

@NgModule({
  imports: [
    AppSharedLibsModule
  ],
  declarations: [
  ],
  providers: [
  ],
  exports: [
    AppSharedLibsModule
  ]
})
export class AppSharedCommonModule {
}
