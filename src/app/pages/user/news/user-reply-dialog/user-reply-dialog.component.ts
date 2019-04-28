import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NoteReply} from '../../../../core/models/note-reply';
import {PageHelper} from '../../../../core/models/page-helper';
import {NoteReplyService} from '../../../../core/services/note-reply.service';
import {AjaxResponse} from '../../../../core/models/ajax-response';

@Component({
  selector: 'app-user-reply-dialog',
  templateUrl: './user-reply-dialog.component.html',
  styleUrls: ['./user-reply-dialog.component.scss']
})
export class UserReplyDialogComponent implements OnInit {

  content: string;
  replies: NoteReply[] = [];
  pageInfo: PageHelper<NoteReply>;

  constructor(private dialogRef: MatDialogRef<UserReplyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private noteReply: NoteReply,
              private replyService: NoteReplyService) {
  }

  ngOnInit() {
  this.getReplyList();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  publish() {
    const reply = new NoteReply();
    reply.toUserId = this.noteReply.fromUserId;
    reply.content = this.content;
    reply.commentId = this.noteReply.toUserId;
    this.replyService.save(reply).subscribe(
      data => {
        this.getReplyList();
      }
    );
  }

  delete(id: string) {
    this.replyService.delete(id).subscribe(
      data => {
        this.getReplyList();
      }
    );
  }

  getReplyList() {
    this.replyService.getReplyList(this.noteReply.fromUserId, this.noteReply.commentId).subscribe((data: AjaxResponse<NoteReply[]>) => {
      this.replies = data.data;
    });
  }
}
