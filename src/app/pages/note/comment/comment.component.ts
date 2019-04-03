import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NoteReplyDialogComponent} from '../note-reply-dialog/note-reply-dialog.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openReplyDialog(id: string) {
    this.dialog.open(NoteReplyDialogComponent, {
      width: '800px'
    });
  }
}
