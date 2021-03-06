import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NoteComponent} from './note.component';
import {NoteRoutes} from './note.routing';
import {ShareModule} from '../../share.module';
import {DetailedComponent} from './detailed/detailed.component';
import {CustomMaterialModule} from '../../customMaterial.module';
import {WINDOW_PROVIDERS} from '../../core/services/window.service';
import {CommentComponent} from './comment/comment.component';
import {MaintainComponent} from './maintain/maintain.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SearchComponent} from './search/search.component';
import {ImageCropperDialogModule} from '../../dialog/image-cropper-dialog/image-cropper-dialog.module';
import {NoteService} from '../../core/services/note.service';
import {NoteReplyDialogComponent} from './note-reply-dialog/note-reply-dialog.component';
import {NoteDeclarationDialogComponent} from './note-declaration-dialog/note-declaration-dialog.component';
import {CustomQuillEditorModule} from '../../common/custom-quill-editor/custom-quill-editor.module';

@NgModule({
  imports: [
    CommonModule,
    NoteRoutes,
    ShareModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
/*    QuillModule,
    ImageUploadModule.forRoot(),*/
    CustomQuillEditorModule,
    ImageCropperDialogModule
  ],
  declarations: [
    NoteComponent,
    CommentComponent,
    DetailedComponent,
    MaintainComponent,
    SearchComponent,
    NoteReplyDialogComponent,
    NoteDeclarationDialogComponent],
  entryComponents: [NoteReplyDialogComponent, NoteDeclarationDialogComponent],
  exports: [
    NoteComponent
  ],
  providers: [WINDOW_PROVIDERS, NoteService]
})
export class NoteModule {
}
