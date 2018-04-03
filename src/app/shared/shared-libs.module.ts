import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    NgbModule.forRoot(),
  ],
  exports: [
    FormsModule,
    CommonModule,
    NgbModule,
  ]
})
export class AppSharedLibsModule {}
