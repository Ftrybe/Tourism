import {Routes, RouterModule} from '@angular/router';
import {SceneryComponent} from './scenery.component';
import {DetailedComponent} from './detailed/detailed.component';
import {SceneryDetailResolverService} from '../../core/resolver/scenery-detail-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: SceneryComponent,
    pathMatch: 'full'
  }, {
    path: ':id',
    component: DetailedComponent,
    resolve: [SceneryDetailResolverService]
  }
];

export const SceneryRoutes = RouterModule.forChild(routes);
