import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImageCropperModule} from 'ngx-image-cropper';
import {ImageCropperDialogComponent} from './image-cropper-dialog.component';
import {MatDialogModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ImageCropperModule,
    MatDialogModule
  ],
  declarations: [ImageCropperDialogComponent],
  entryComponents: [ImageCropperDialogComponent]
})
export class ImageCropperDialogModule { }
