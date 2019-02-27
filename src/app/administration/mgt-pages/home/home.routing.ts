import {RouterModule, Routes} from '@angular/router';
import {BannerComponent} from './banner/banner.component';
import {HotComponent} from './hot/hot.component';

const routes: Routes = [
 {
    path: 'banner',
    component: BannerComponent,
     data: {breadcrumb: 'Banner'}
  }, {
    path: 'hot',
    component: HotComponent,
    data: {breadcrumb: '推荐列表'}
  }
];
export const RoutingComponents = [ BannerComponent, HotComponent];
export const HomeRoutes = RouterModule.forChild(routes);
