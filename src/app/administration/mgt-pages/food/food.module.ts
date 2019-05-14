import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FoodComponent} from './food.component';
import {FoodRoutes} from './food.routing';
import {DetailedComponent} from './detailed/detailed.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ngx-image-cropper';
import {QuillModule} from 'ngx-quill';
import {ImageUploadModule} from 'angular2-image-upload';
import {ImageCropperDialogModule} from '../../../dialog/image-cropper-dialog/image-cropper-dialog.module';
import {BaiduMapModule} from 'angular2-baidu-map';
import {FoodMapDialogComponent} from './food-map-dialog/food-map-dialog.component';
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
    FoodRoutes,
    CustomQuillEditorModule,
  ],
  declarations: [FoodComponent, DetailedComponent, FoodMapDialogComponent],
  entryComponents: [FoodMapDialogComponent]
})
export class FoodModule {
}
