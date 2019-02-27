import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NoteComponent} from './note.component';
import {NoteRoutes} from './note.routing';
import {ShareModule} from '../../share.module';

import {DetailedComponent} from './detailed/detailed.component';
import {CustomMaterialModule} from '../../customMaterial.module';
import { WINDOW_PROVIDERS} from '../../core/services/window.service';
import {CommentComponent} from '../../common/comment/comment.component';

@NgModule({
  imports: [
    CommonModule,
    NoteRoutes,
    ShareModule,
    CustomMaterialModule
  ],
  declarations: [NoteComponent, DetailedComponent,CommentComponent],
  providers: [WINDOW_PROVIDERS]
})
export class NoteModule {
}
