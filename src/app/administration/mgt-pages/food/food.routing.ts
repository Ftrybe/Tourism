import {RouterModule, Routes} from '@angular/router';
import {EndArticleDetailResolverService} from '../../../core/resolver/end/end-article-detail-resolver.service';
import {FoodComponent} from './food.component';

const routes: Routes = [
  {
    path: '',
    component: FoodComponent,
    pathMatch: 'full'
  }, {
    path: 'food',
    component: FoodComponent,
    data: {breadcrumb: '添加文章'}
  },
  {
    path: 'food/:id',
    component: FoodComponent,
    resolve: [
      EndArticleDetailResolverService
    ],
    data: {breadcrumb: '添加美食'}
  }
];
export const RoutingComponents = [FoodComponent];
export const FoodRoutes = RouterModule.forChild(routes);
