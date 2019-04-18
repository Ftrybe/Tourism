import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {NoteReplyDialogComponent} from '../note-reply-dialog/note-reply-dialog.component';
import {animate, style, transition, trigger} from '@angular/animations';
import {NoteCommentService} from '../../../core/services/note-comment.service';
import {Note} from '../../../core/models/note';
import {NoteComment} from '../../../core/models/note-comment';
import {NoteReplyService} from '../../../core/services/note-reply.service';
import {PageHelper} from '../../../core/models/page-helper';

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
        animate('1s', style({opacity: 0}))
      ])
    ]),
  ]
})
export class CommentComponent implements OnInit {

  content: string;
  pageInfo: PageHelper<NoteComment>;
  comments: NoteComment[];
  @Input() note: Note;

  constructor(private dialog: MatDialog,
              private commentService: NoteCommentService,
              private replyService: NoteReplyService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getComment();
  }

  openReplyDialog(comment) {
    this.dialog.open(NoteReplyDialogComponent, {
      panelClass: 'full-width',
      width: '800px',
      data: comment
    });
  }

  getComment() {
    this.commentService.getList(1, this.note.id).subscribe(
      data => {
        this.pageInfo = data;
        this.comments = data.list;
      }
    );
  }

  publish() {
    let comment: NoteComment = new NoteComment;
    comment.noteId = this.note.id;
    comment.content = this.content;
    this.commentService.save(comment).subscribe(
      data => {
        this.snackBar.open(data.message, '关闭', {duration: 2000});
        this.getComment();
      }
    );
  }
}
