import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';

const LAYOUT_ROUTES = [
    navbarRoute,
    ...errorRoute
];

@NgModule({
    imports: [
      RouterModule.forRoot(LAYOUT_ROUTES, { useHash: true , enableTracing: false })

    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
