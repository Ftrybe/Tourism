import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FileHolder} from 'angular2-image-upload';

@Component({
  selector: 'app-articles-image-dialog',
  templateUrl: './articles-image-dialog.component.html',
  styleUrls: ['./articles-image-dialog.component.scss']
})
export class ArticlesImageDialogComponent implements OnInit {
  images: any;

  constructor(private dialogRef: MatDialogRef<ArticlesImageDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public articleId: string) {
  }

  ngOnInit() {
  }

  uploadFinish(holder: FileHolder) {
    console.log(holder);
  }
}
