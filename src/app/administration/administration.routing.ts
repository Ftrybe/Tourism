import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import {ErrorComponent} from './pages/errors/error/error.component';
import {PagesComponent} from './pages/pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent, children: [
      {path: '', loadChildren: './pages/dashboard/dashboard.module#DashboardModule', data: {breadcrumb: 'Dashboard'}},
      {path: 'users', loadChildren: './pages/users/users.module#UsersModule', data: {breadcrumb: 'Users'}}
    ]
  },
  {path: 'login', loadChildren: './pages/login/login.module#LoginModule'},
  {path: 'error', component: ErrorComponent, data: {breadcrumb: 'Error'}},
];

export const AdministrationRoutes = RouterModule.forChild(routes);
