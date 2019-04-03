import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NoteComponent} from './note.component';
import {NoteRoutes} from './note.routing';
import {ShareModule} from '../../share.module';

import {DetailedComponent} from './detailed/detailed.component';
import {CustomMaterialModule} from '../../customMaterial.module';
import {WINDOW_PROVIDERS} from '../../core/services/window.service';
import {CommentComponent} from './comment/comment.component';
import {QuillModule} from 'ngx-quill';
import {MaintainComponent} from './maintain/maintain.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SearchComponent} from '../../common/search/search.component';
import {ImageUploadModule} from 'angular2-image-upload';
import {ImageCropperDialogModule} from '../../dialog/image-cropper-dialog/image-cropper-dialog.module';
import {OnlyTextForEditorPipe} from '../../core/pipe/only-text-for-editor.pipe';
import {NoteService} from '../../core/services/note.service';
import { NoteReplyDialogComponent } from './note-reply-dialog/note-reply-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    NoteRoutes,
    ShareModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    QuillModule,
    ImageUploadModule.forRoot(),
    ImageCropperDialogModule
  ],
  declarations: [NoteComponent, DetailedComponent, CommentComponent, MaintainComponent, SearchComponent, NoteReplyDialogComponent],
  entryComponents: [NoteReplyDialogComponent],
  providers: [WINDOW_PROVIDERS, NoteService]
})
export class NoteModule {
}
