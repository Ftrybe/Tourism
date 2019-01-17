import {Routes, RouterModule} from '@angular/router';
import {NoteComponent} from './note.component';

const routes: Routes = [
  {
    path: '',
    component: NoteComponent
  }
];

export const NoteRoutes = RouterModule.forChild(routes);
