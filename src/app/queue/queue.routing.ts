import { Routes } from '@angular/router';
import { QueueComponent } from './queue.component';
import { QueueFormComponent } from './form/queue.form.component';
import { QueueAttendedComponent } from './attended/queue.attended.component';
import { QueueNotAttendedComponent } from './notattended/queue.notattended.component';

export const QueueRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: QueueComponent,
        data: {
          // title: 'Fila',
          urls: [
            // { title: 'Fila', url: '/queue' },
            { title: 'Fila' }
          ]
        }
      },
      {
        path: 'incluir',
        component: QueueFormComponent,
        data: {
          // title: 'Fila | Destinos | Editar',
          urls: [
            { title: 'Fila', url: '/fila' },
            { title: 'Incluir' }
          ]
        }
      },
      {
        path: 'compareceram',
        component: QueueAttendedComponent,
        data: {
          // title: 'Fila | Destinos | Editar',
          urls: [
            { title: 'Fila', url: '/fila' },
            { title: 'Compareceram' }
          ]
        }
      },
      {
        path: 'nao-compareceram',
        component: QueueNotAttendedComponent,
        data: {
          // title: 'Fila | Destinos | Editar',
          urls: [
            { title: 'Fila', url: '/fila' },
            { title: 'Não compareceram' }
          ]
        }
      },
    ]
  }

];
