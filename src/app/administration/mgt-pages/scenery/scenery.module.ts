import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SceneryComponent} from './scenery.component';
import {SceneryRoutes} from './scenery.routing';
import {DetailedComponent} from './detailed/detailed.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ngx-image-cropper';
import {QuillModule} from 'ngx-quill';
import {ImageUploadModule} from 'angular2-image-upload';
import {ImageCropperDialogModule} from '../../../dialog/image-cropper-dialog/image-cropper-dialog.module';
import {BaiduMapModule} from 'angular2-baidu-map';
import {SceneryMapDialogComponent} from './scenery-map-dialog/scenery-map-dialog.component';
import {CustomQuillEditorModule} from '../../../common/custom-quill-editor/custom-quill-editor.module';

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    QuillModule,
    ImageUploadModule.forRoot(),
    ImageCropperDialogModule,
    BaiduMapModule.forRoot({ak: '8F1HxkUfqSGRywCZYdEZqw4DGLX5glk2'}),
    ImageUploadModule,
    SceneryRoutes,
    CustomQuillEditorModule
  ],
  declarations: [SceneryComponent, DetailedComponent, SceneryMapDialogComponent],
  entryComponents: [SceneryMapDialogComponent]
})
export class SceneryModule { }
