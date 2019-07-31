import { Routes } from '@angular/router';
import { DestinationComponent } from './destination.component';
import { DestinationFormComponent } from './form/destination.form.component';

export const DestinationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DestinationComponent,
        data: {
          // title: 'Fila | Destinos',
          urls: [
            { title: 'Fila', url: '/fila' },
            { title: 'Destinos' }
          ]
        }
      },
      {
        path: 'incluir',
        component: DestinationFormComponent,
        data: {
          // title: 'Fila | Destinos | Editar',
          urls: [
            { title: 'Fila', url: '/fila' },
            { title: 'Destinos', url: '/destinos' },
            { title: 'Incluir' }
          ]
        }
      },
      {
        path: 'editar/:id',
        component: DestinationFormComponent,
        data: {
          // title: 'Fila | Destinos | Editar',
          urls: [
            { title: 'Fila', url: '/fila' },
            { title: 'Destinos', url: '/destinos' },
            { title: 'Editar' }
          ]
        }
      }
    ]
  }

];
