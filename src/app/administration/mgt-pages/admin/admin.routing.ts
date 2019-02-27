import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
   }
];
export const RoutingComponents = [AdminComponent];
export const AdminRoutes = RouterModule.forChild(routes);
