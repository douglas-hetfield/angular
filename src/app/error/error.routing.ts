import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

export const ErrorRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'not-found',
        component: NotFoundComponent
      }
    ]
  }

];
