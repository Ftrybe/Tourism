import {Routes, RouterModule} from '@angular/router';
import {NoteComponent} from './note.component';
import {DetailedComponent} from './detailed/detailed.component';

const routes: Routes = [
  {
    path: '',
    component: NoteComponent
  },
  {
    path: ':id',
    component: DetailedComponent
  }
];

export const NoteRoutes = RouterModule.forChild(routes);
