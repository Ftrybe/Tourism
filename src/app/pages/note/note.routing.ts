import {Routes, RouterModule} from '@angular/router';
import {NoteComponent} from './note.component';
import {DetailedComponent} from './detailed/detailed.component';
import {MaintainComponent} from './maintain/maintain.component';
import {NoteModifyResolverService} from '../../core/resolver/note-modify-resolver.service';
import {NoteDetailResolverService} from '../../core/resolver/note-detail-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: NoteComponent
  },
  {
    path: 'publish/:id',
    component: MaintainComponent
  },
  {
    path: 'modify/:id',
    component: MaintainComponent,
    resolve: [
      NoteModifyResolverService
    ]
  },
  {
    path: 'detailed/:id',
    component: DetailedComponent,
    resolve: [
      NoteDetailResolverService
    ]
  }
];

export const NoteRoutes = RouterModule.forChild(routes);
