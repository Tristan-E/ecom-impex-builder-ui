import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppSharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppHomeModule } from './home/home.module';
import { AppEntityModule } from './entities/entity.module';
import { AppImpexBuilderModule } from './impex-builder/impex-builder.module';
import { HttpClientModule } from '@angular/common/http';
import {
  AppMainComponent,
  NavbarComponent,
  FooterComponent,
  ErrorComponent
} from './layouts';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppSharedModule,
    AppHomeModule,
    AppEntityModule,
    AppImpexBuilderModule,
    HttpClientModule
  ],
  declarations: [
    AppMainComponent,
    NavbarComponent,
    ErrorComponent,
    FooterComponent
  ],
  providers: [],
  bootstrap: [AppMainComponent]
})
export class AppModule { }
