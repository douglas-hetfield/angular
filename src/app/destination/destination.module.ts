import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { DestinationRoutes } from './destination.routing';

import { DestinationComponent } from './destination.component';
import { DestinationFormComponent } from './form/destination.form.component';

@NgModule({
  imports: [
    RouterModule.forChild(DestinationRoutes),
    CommonModule,
    NgbModule.forRoot(),
    NgxDatatableModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [
    DestinationComponent,
    DestinationFormComponent
  ]
})
export class DestinationModule { }