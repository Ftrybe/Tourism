import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from './user.component';


const routes: Routes = [
  {
    path: ':id',
    component: UserComponent
   }
];

export const UserRoutes = RouterModule.forChild(routes);
