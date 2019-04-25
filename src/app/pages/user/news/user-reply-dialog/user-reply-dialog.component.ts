import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NoteReply} from '../../../../core/models/note-reply';
import {PageHelper} from '../../../../core/models/page-helper';
import {NoteReplyService} from '../../../../core/services/note-reply.service';
import {UsersService} from '../../../../core/services/users.service';

@Component({
  selector: 'app-user-reply-dialog',
  templateUrl: './user-reply-dialog.component.html',
  styleUrls: ['./user-reply-dialog.component.scss']
})
export class UserReplyDialogComponent implements OnInit {

  content: string;
  currentUserId: string;
  canDelete: boolean;
  replies: NoteReply[] = null;
  pageInfo: PageHelper<NoteReply>;

  constructor(private dialogRef: MatDialogRef<UserReplyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private reply: NoteReply,
              private replyService: NoteReplyService,
              private userService: UsersService) {
  }

  ngOnInit() {
    // this.getList(this.comment.id);
    this.currentUserId = this.userService.getUserId();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  publish() {
    let reply = new NoteReply();
    reply.toUserId = this.reply.toUserId;
    reply.content = this.content;
    reply.commentId = this.reply.fromUserId;
    this.replyService.save(reply).subscribe(
      data => {
        // this.getList(this.comment.id);
      }
    );
  }
  delete(id: string) {
    this.replyService.delete(id).subscribe(
      data => {
        //  this.getList(this.comment.id);
      }
    );
  }
}
