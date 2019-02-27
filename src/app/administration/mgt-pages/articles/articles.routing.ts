import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './articles.component';
import {ArticleComponent} from './article/article.component';

const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
    pathMatch: 'full'
   },{
  path: 'add',
    component: ArticleComponent,
    data: { breadcrumb: '添加美食'}
  }
];
export const RoutingComponents = [ArticlesComponent, ArticleComponent];
export const ArticlesRoutes = RouterModule.forChild(routes);
