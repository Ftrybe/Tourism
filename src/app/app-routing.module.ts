import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeContentComponent } from './home/content/content.component'

const routes: Routes = [
  { path: '', redirectTo: "/index", pathMatch: "full" },
  { path: 'index', component: HomeContentComponent },
  { path: 'scenery', loadChildren: './page/scenery/scenery.module#SceneryModule' },
  { path: 'note', loadChildren: './page/note/note.module#NoteModule' },
  { path: 'introduction', loadChildren: './page/introduction/introduction.module#IntroductionModule' },
  {
    path: 'food', loadChildren: './page/food/food.module#FoodModule'
  },

  { path: '**', redirectTo: "/index" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeContentComponent]
