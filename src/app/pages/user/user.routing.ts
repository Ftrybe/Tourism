import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from './user.component';
import {UserDetailResolverService} from '../../core/resolver/user-detail-resolver.service';


const routes: Routes = [
  {
    path: ':id',
    component: UserComponent,
    resolve: {
      user: UserDetailResolverService
    }
   }
];

export const UserRoutes = RouterModule.forChild(routes);
