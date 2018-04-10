import { Route } from '@angular/router';

import { ImpexBuilderComponent } from './impex-builder.component';

export const IMPEX_BUILDER_ROUTE: Route = {
  path: 'impex-builder',
  component: ImpexBuilderComponent,
  data: {
    pageTitle: 'Impex Builder Page'
  }
};
