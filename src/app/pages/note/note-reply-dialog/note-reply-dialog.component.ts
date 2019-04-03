import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-note-reply-dialog',
  templateUrl: './note-reply-dialog.component.html',
  styleUrls: ['./note-reply-dialog.component.scss']
})
export class NoteReplyDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<NoteReplyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
  }

}
