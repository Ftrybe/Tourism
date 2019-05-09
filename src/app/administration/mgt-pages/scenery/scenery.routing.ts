import {RouterModule, Routes} from '@angular/router';
import {EndArticleDetailResolverService} from '../../../core/resolver/end/end-article-detail-resolver.service';
import {SceneryComponent} from './scenery.component';
import {DetailedComponent} from './detailed/detailed.component';


const routes: Routes = [
  {
    path: '',
    component: SceneryComponent,
    pathMatch: 'full'
  }, {
    path: 'scenery',
    component: DetailedComponent,
    data: {breadcrumb: '添加景点'}
  },
  {
    path: 'scenery/:id',
    component: DetailedComponent,
    resolve: [
      EndArticleDetailResolverService
    ],
    data: {breadcrumb: '添加景点'}
  }
];
export const RoutingComponents = [SceneryComponent];
export const SceneryRoutes = RouterModule.forChild(routes);
