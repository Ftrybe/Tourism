import { Routes, RouterModule } from '@angular/router';
import { FoodComponent } from './food.component';
import {DetailedComponent} from './detailed/detailed.component';
import {FoodDetailResolverService} from '../../core/resolver/food-detail-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: FoodComponent
   }, {
  path: ':id',
    component: DetailedComponent,
    resolve: [FoodDetailResolverService]
  }
];
export const FoodRoutes = RouterModule.forChild(routes);
