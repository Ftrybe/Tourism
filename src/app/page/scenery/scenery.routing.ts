import { Routes, RouterModule } from '@angular/router';
import { SceneryComponent } from './scenery.component';
import { DetailedComponent } from './detailed/detailed.component';

const routes: Routes = [
  {
    path: '',
    component: SceneryComponent
   }, {
    path: ':id',
    component: DetailedComponent
  }
];

export const SceneryRoutes = RouterModule.forChild(routes);
