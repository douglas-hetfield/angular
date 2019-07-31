import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { DateFormatPipe } from '../_pipes/date-format/date-format.pipe';
import { DateTimeFormatPipe } from '../_pipes/date-format/date-time-format.pipe';
import { TimeFormatPipe } from '../_pipes/date-format/time-format.pipe';

import { QueueRoutes } from './queue.routing';

import { QueueComponent } from './queue.component';
import { QueueFormComponent } from './form/queue.form.component';
import { QueueAttendedComponent } from './attended/queue.attended.component';
import { QueueNotAttendedComponent } from './notattended/queue.notattended.component';

@NgModule({
  imports: [
    RouterModule.forChild(QueueRoutes),
    CommonModule,
    NgbModule.forRoot(),
    NgxDatatableModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [
    QueueComponent,
    DateFormatPipe,
    DateTimeFormatPipe,
    TimeFormatPipe,
    QueueFormComponent,
    QueueAttendedComponent,
    QueueNotAttendedComponent,
  ]
})
export class QueueModule { }