import {ModuleWithProviders, NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {PageComponent} from './pages/page.component';
import {HomeContentComponent} from './pages/home/content/content.component';
import {CanActivateAuthGuard} from './core/interceptors/can-activate.authguard';


const routes: Routes = [
  {
    path: '', component: PageComponent, children: [
      {path: '', component: HomeContentComponent, data: {title: '罗源游'}},
      {path: 'scenery', loadChildren: './pages/scenery/scenery.module#SceneryModule', data: {title: '景点推荐'}},
      {path: 'note', loadChildren: './pages/note/note.module#NoteModule', data: {title: '旅游游记'}},
      {path: 'introduction', loadChildren: './pages/introduction/introduction.module#IntroductionModule', data: {title: '罗源湾简介'}},
      {path: 'food', loadChildren: './pages/food/food.module#FoodModule', data: {title: '美食推荐'}},
      {path: 'user', loadChildren: './pages/user/user.module#UserModule', data: {title: '个人中心'}},
    ]
  },
  {
    path: 'manager',
    loadChildren: './administration/administration.module#AdministrationModule',
    data: {title: '后台'},
    canActivate: [CanActivateAuthGuard]
  },
  {path: '**', loadChildren: './pages/error/error.module#ErrorModule', data: {title: '页面未找到'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [PageComponent, HomeContentComponent];

