import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {NoteReplyDialogComponent} from '../note-reply-dialog/note-reply-dialog.component';
import {animate, style, transition, trigger} from '@angular/animations';
import {NoteCommentService} from '../../../core/services/note-comment.service';
import {Note} from '../../../core/models/note';
import {NoteComment} from '../../../core/models/note-comment';
import {NoteReplyService} from '../../../core/services/note-reply.service';

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

  hasData: boolean;
  content: string;
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

  openReplyDialog(id: string) {
    this.dialog.open(NoteReplyDialogComponent, {
      width: '800px'
    });
  }

  getReply(id: string) {
    this.hasData = !this.hasData;
    this.replyService.list(id);
  }

  getComment() {
    this.commentService.getList(1).subscribe(
      data => {
        this.comments = data;
        console.log(data);
      }
    );
  }

  publish() {
    let comment: NoteComment = new NoteComment;
    comment.noteId = this.note.id;
    comment.fromUserId = this.note.userId;
    comment.content = this.content;
    this.commentService.save(comment).subscribe(
      data => {
        this.snackBar.open('回复成功', '关闭', {duration: 2000});
      }
    );
  }
}
