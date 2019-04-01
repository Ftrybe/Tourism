import {Component, Inject, OnInit} from '@angular/core';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

interface Data {
  title: string;
  resizeToWidth: number;
  cropperMinWidth: number;
  aspectRatio: number;
  image: string;
  maintainAspectRatio: boolean;
}
@Component({
  selector: 'app-image-cropper-dialog',
  templateUrl: './image-cropper-dialog.component.html',
  styleUrls: ['./image-cropper-dialog.component.scss']
})
export class ImageCropperDialogComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  info: Data;
  constructor(private dialogRef: MatDialogRef<ImageCropperDialogComponent>,
                 @Inject(MAT_DIALOG_DATA) private data: Data
  ) {
  }

  ngOnInit() {
    this.info = this.data;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.croppedImage);
  }

  cropperReady() {

  }

  ratioChanged(event: Event) {
    console.log(event);
  }
}
