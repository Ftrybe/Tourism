import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotesRoutes, RoutingComponents} from './notes.routing';
import {SharedModule} from '../../shared/shared.module';
import {QuillModule} from 'ngx-quill';
import {NoteDialogComponent} from './note-dialog/note-dialog.component';
import {ShareModule} from '../../../share.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NotesRoutes,
    QuillModule,
    ShareModule
  ],
  declarations: [
    RoutingComponents,
    NoteDialogComponent
  ],
  entryComponents: [
    NoteDialogComponent
  ]
})
export class NotesModule {
}
