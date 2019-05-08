import {RouterModule, Routes} from '@angular/router';
import {EndArticleDetailResolverService} from '../../../core/resolver/end/end-article-detail-resolver.service';
import {SceneryComponent} from './scenery.component';

const routes: Routes = [
  {
    path: '',
    component: SceneryComponent,
    pathMatch: 'full'
  }, {
    path: 'food',
    component: SceneryComponent,
    data: {breadcrumb: '添加景点'}
  },
  {
    path: 'food/:id',
    component: SceneryComponent,
    resolve: [
      EndArticleDetailResolverService
    ],
    data: {breadcrumb: '添加景点'}
  }
];
export const RoutingComponents = [SceneryComponent];
export const SceneryRoutes = RouterModule.forChild(routes);
