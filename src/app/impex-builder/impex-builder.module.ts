import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImpexBuilderComponent } from './impex-builder.component';
import { ImpexBuilderService } from './impex-builder.service';
import { IMPEX_BUILDER_ROUTE } from './impex-builder.route';
import { AppSharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    AppSharedModule,
    RouterModule.forChild([ IMPEX_BUILDER_ROUTE ])
  ],
  declarations: [
    ImpexBuilderComponent
  ],
  entryComponents: [
  ],
  providers: [
    ImpexBuilderService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppImpexBuilderModule {}
