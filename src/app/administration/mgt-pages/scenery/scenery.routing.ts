import {RouterModule, Routes} from '@angular/router';
import {EndArticleDetailResolverService} from '../../../core/resolver/end/end-article-detail-resolver.service';
import {SceneryComponent} from './scenery.component';
import {DetailedComponent} from './detailed/detailed.component';
import {SceneryDetailResolverService} from '../../../core/resolver/scenery-detail-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: SceneryComponent,
    pathMatch: 'full'
  }, {
    path: 'add',
    component: DetailedComponent,
    data: {breadcrumb: '添加景点'}
  },
  {
    path: 'detailed/:id',
    component: DetailedComponent,
    resolve: [
      SceneryDetailResolverService
    ],
    data: {breadcrumb: '修改景点信息'}
  }
];
export const RoutingComponents = [SceneryComponent];
export const SceneryRoutes = RouterModule.forChild(routes);
