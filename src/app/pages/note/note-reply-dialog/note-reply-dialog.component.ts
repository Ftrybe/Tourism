import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NoteReplyService} from '../../../core/services/note-reply.service';

@Component({
  selector: 'app-note-reply-dialog',
  templateUrl: './note-reply-dialog.component.html',
  styleUrls: ['./note-reply-dialog.component.scss']
})
export class NoteReplyDialogComponent implements OnInit {

  content: string;
  currentSelectUser: string;

  constructor(private dialogRef: MatDialogRef<NoteReplyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private replyService: NoteReplyService) {
  }

  ngOnInit() {
  }

  selectUser(id) {
    this.currentSelectUser = id;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
