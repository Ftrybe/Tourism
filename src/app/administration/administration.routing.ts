import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import {ErrorComponent} from './mgt-pages/errors/error/error.component';
import {PagesComponent} from './mgt-pages/pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent, children: [
      {path: '', loadChildren: './mgt-pages/dashboard/dashboard.module#DashboardModule', data: {breadcrumb: '首页'}},
      {path: 'users', loadChildren: './mgt-pages/users/users.module#UsersModule', data: {breadcrumb: '用户管理'}},
      {path: 'articles', loadChildren: './mgt-pages/articles/articles.module#ArticlesModule', data: {breadcrumb: '文章管理'}},
      {path: 'foods', loadChildren: './mgt-pages/food/food.module#FoodModule', data: {breadcrumb: '美食'}},
      {path: 'scenery', loadChildren: './mgt-pages/scenery/scenery.module#SceneryModule', data: {breadcrumb: '景点管理'}},
      {path: 'home', loadChildren: './mgt-pages/home/home.module#HomeModule', data: {breadcrumb: '主页管理'}},
      {path: 'notes', loadChildren: './mgt-pages/notes/notes.module#NotesModule', data: {breadcrumb: '游记管理'}},
      {path: 'feedback', loadChildren: './mgt-pages/feedback/feedback.module#FeedbackModule', data: {breadcrumb: '反馈管理'}},
    ]
  },
  {path: 'login', loadChildren: './mgt-pages/login/login.module#LoginModule'},
  {path: 'error', component: ErrorComponent, data: {breadcrumb: 'Error'}},
];

export const AdministrationRoutes = RouterModule.forChild(routes);
