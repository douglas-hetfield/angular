import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NotFoundComponent } from './not-found/not-found.component';

import { ErrorRoutes } from './error.routing';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ErrorRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    NotFoundComponent
  ]
})
export class ErrorModule { }