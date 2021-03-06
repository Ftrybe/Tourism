import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NoteComment} from '../../../core/models/note-comment';
import {NoteReplyDialogComponent} from '../note-reply-dialog/note-reply-dialog.component';

@Component({
  selector: 'app-note-declaration-dialog',
  templateUrl: './note-declaration-dialog.component.html',
  styleUrls: ['./note-declaration-dialog.component.scss']
})
export class NoteDeclarationDialogComponent implements OnInit {
  content: any;

  constructor(private dialogRef: MatDialogRef<NoteReplyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private declaration: any ) { }

  ngOnInit() {
    this.content = this.declaration;
  }

}
