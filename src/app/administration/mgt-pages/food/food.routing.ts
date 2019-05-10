import {RouterModule, Routes} from '@angular/router';
import {EndArticleDetailResolverService} from '../../../core/resolver/end/end-article-detail-resolver.service';
import {FoodComponent} from './food.component';
import {DetailedComponent} from './detailed/detailed.component';
import {FoodDetailResolverService} from '../../../core/resolver/food-detail-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: FoodComponent,
    pathMatch: 'full'
  }, {
    path: 'add',
    component: DetailedComponent,
    data: {breadcrumb: '添加美食'}
  },
  {
    path: 'detailed/:id',
    component: DetailedComponent,
    resolve: [
      FoodDetailResolverService
    ],
    data: {breadcrumb: '修改美食信息'}
  }
];
export const RoutingComponents = [FoodComponent];
export const FoodRoutes = RouterModule.forChild(routes);
