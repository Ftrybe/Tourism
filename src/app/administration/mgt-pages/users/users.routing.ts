import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './users.component';

const routes: Routes = [
  {path: '', component: UsersComponent, pathMatch: 'full'}
];
export const RoutingComponents = [UsersComponent];
export const UsersRoutes = RouterModule.forChild(routes);
