import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NoteReplyDialogComponent} from '../note-reply-dialog/note-reply-dialog.component';
import has = Reflect.has;
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  animations: [
    trigger('organ', [
      transition(':enter', [
        style({opacity: 0}),
        animate('1s', style({opacity: 1})),
      ]),
      transition(':leave', [
        animate('1s', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class CommentComponent implements OnInit {

  hasData: boolean;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openReplyDialog(id: string) {
    this.dialog.open(NoteReplyDialogComponent, {
      width: '800px'
    });
  }

  getReply(id: string) {
    this.hasData = !this.hasData;
  }

}
