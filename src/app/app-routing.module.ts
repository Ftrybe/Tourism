import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeContentComponent } from './home/content/content.component';

const routes: Routes = [
  { path: '', component: HomeContentComponent,  data: { title: '罗源游'},pathMatch: 'full' },
  { path: 'index', component: HomeContentComponent , data: { title: '罗源游'}},
  { path: 'scenery', loadChildren: './page/scenery/scenery.module#SceneryModule', data: {title: '景点推荐'} },
  { path: 'note', loadChildren: './page/note/note.module#NoteModule', data: {title: '旅游游记'} },
  { path: 'introduction', loadChildren: './page/introduction/introduction.module#IntroductionModule', data: {title: '罗源湾简介'} },
  {path: 'food', loadChildren: './page/food/food.module#FoodModule', data: {title: '美食推荐'}},
  { path: '**', redirectTo: '/index' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeContentComponent];
