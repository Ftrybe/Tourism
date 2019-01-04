import { Routes, RouterModule } from '@angular/router';
import { FoodComponent } from './food.component';
import {DetailedComponent} from './detailed/detailed.component';

const routes: Routes = [
  {
    path: '',
    component: FoodComponent
   }, {
  path: ':id',
    component: DetailedComponent
  }
];
export const FoodRoutes = RouterModule.forChild(routes);
