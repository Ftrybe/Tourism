import {RouterModule, Routes} from '@angular/router';
import {NotesComponent} from './notes.component';

const routes: Routes = [
  {
    path: '',
    component: NotesComponent
   }
];
export const RoutingComponents = [NotesComponent];
export const NotesRoutes = RouterModule.forChild(routes);
