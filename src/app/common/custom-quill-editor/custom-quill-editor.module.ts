import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomQuillEditorComponent } from './custom-quill-editor.component';
import {QuillModule} from 'ngx-quill';
import {ImageUploadModule} from 'angular2-image-upload';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    QuillModule,
    ImageUploadModule.forRoot(),
    ReactiveFormsModule,
  ],
  declarations: [CustomQuillEditorComponent],
  exports:[CustomQuillEditorComponent]
})
export class CustomQuillEditorModule { }
