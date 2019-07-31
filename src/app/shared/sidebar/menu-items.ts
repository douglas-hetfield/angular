import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/fila',
    title: 'Mostrar fila',
    icon: 'fa fa-users',
    class: '',
    ddclass: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/fila/incluir',
    title: 'Incluir na fila',
    icon: 'fa fa-user-plus',
    class: '',
    ddclass: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/destinos',
    title: 'Destinos',
    icon: 'fa fa-arrow-right',
    class: '',
    ddclass: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Gerenciar',
    icon: 'fa fa-cog',
    class: '',
    ddclass: '',
    extralink: false,
    submenu: [
      {
        path: '/fila/compareceram',
        title: 'Compareceram',
        icon: 'fa fa-check',
        class: '',
        ddclass: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/fila/nao-compareceram',
        title: 'Não compareceram',
        icon: 'fa fa-times',
        class: '',
        ddclass: '',
        extralink: false,
        submenu: []
      },
    ]
  }
];
