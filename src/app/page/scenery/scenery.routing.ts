import { Routes, RouterModule } from '@angular/router';
import { SceneryComponent } from './scenery.component';

const routes: Routes = [
  { 
    path:'',
    component:SceneryComponent
   }
];

export const SceneryRoutes = RouterModule.forChild(routes);
