import {RouterModule, Routes} from '@angular/router';
import {EndArticleDetailResolverService} from '../../../core/resolver/end/end-article-detail-resolver.service';
import {FoodComponent} from './food.component';
import {DetailedComponent} from './detailed/detailed.component';

const routes: Routes = [
  {
    path: '',
    component: FoodComponent,
    pathMatch: 'full'
  }, {
    path: 'food',
    component: DetailedComponent,
    data: {breadcrumb: '添加美食'}
  },
  {
    path: 'food/:id',
    component: DetailedComponent,
    resolve: [
      EndArticleDetailResolverService
    ],
    data: {breadcrumb: '添加美食'}
  }
];
export const RoutingComponents = [FoodComponent];
export const FoodRoutes = RouterModule.forChild(routes);
