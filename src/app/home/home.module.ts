import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HOME_ROUTE } from './home.route';
import { TreeModule } from 'angular-tree-component';
import { TreeService } from './tree.service';

@NgModule({
  imports: [
    RouterModule.forChild([ HOME_ROUTE ]),
    TreeModule
  ],
  declarations: [
    HomeComponent,
  ],
  entryComponents: [
  ],
  providers: [
    TreeService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppHomeModule {}
