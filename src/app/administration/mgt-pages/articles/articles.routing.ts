import {Routes, RouterModule} from '@angular/router';
import {ArticlesComponent} from './articles.component';
import {ArticleComponent} from './article/article.component';
import {EndArticleDetailResolverService} from '../../../core/resolver/end/end-article-detail-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
    pathMatch: 'full'
  }, {
    path: 'article',
    component: ArticleComponent,
    data: {breadcrumb: '添加文章'}
  },
  {
    path: 'article/:id',
    component: ArticleComponent,
    resolve: [
      EndArticleDetailResolverService
    ],
    data: {breadcrumb: '添加文章'}
  }
];
export const RoutingComponents = [ArticlesComponent, ArticleComponent];
export const ArticlesRoutes = RouterModule.forChild(routes);
