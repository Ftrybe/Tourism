import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NoteReplyService} from '../../../core/services/note-reply.service';
import {NoteReply} from '../../../core/models/note-reply';
import {PageHelper} from '../../../core/models/page-helper';
import {NoteComment} from '../../../core/models/note-comment';
import {UsersService} from '../../../core/services/users.service';

@Component({
  selector: 'app-note-reply-dialog',
  templateUrl: './note-reply-dialog.component.html',
  styleUrls: ['./note-reply-dialog.component.scss']
})
export class NoteReplyDialogComponent implements OnInit {

  content: string;
  currentSelectUser: string = this.comment.userNickname;
  currentSelectUserId: string = this.comment.fromUserId;
  currentUserId: string;
  canDelete: boolean;
  replies: NoteReply[] = null;
  pageInfo: PageHelper<NoteReply>;

  constructor(private dialogRef: MatDialogRef<NoteReplyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private comment: NoteComment,
              private replyService: NoteReplyService,
              private userService: UsersService) {
  }

  ngOnInit() {
    this.getList(this.comment.id);
    this.currentUserId = this.userService.getUserId();
  }

  selectUser(reply) {
    if (reply.fromUserId === this.currentUserId) {
      return;
    } else {
      this.currentSelectUser = reply.fromUserNickname;
      this.currentSelectUserId = reply.fromUserId;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  publish() {
    let reply = new NoteReply();
    reply.toUserId = this.currentSelectUserId;
    reply.content = this.content;
    reply.commentId = this.comment.id;
    this.replyService.save(reply).subscribe(
      data => {
        this.getList(this.comment.id);
      }
    );
  }

  getList(id) {
    this.replyService.list(id).subscribe(
      (data: PageHelper<NoteReply>) => {
        this.pageInfo = data;
        this.replies = data.list;
      }
    );
  }

  delete(id: string) {
    this.replyService.delete(id).subscribe(
      data => {
        this.getList(this.comment.id);
      }
    );
  }
}
