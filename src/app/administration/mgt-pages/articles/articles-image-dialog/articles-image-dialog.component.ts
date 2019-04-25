import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-articles-image-dialog',
  templateUrl: './articles-image-dialog.component.html',
  styleUrls: ['./articles-image-dialog.component.scss']
})
export class ArticlesImageDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ArticlesImageDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public articleId: string) { }

  ngOnInit() {
  }

}
