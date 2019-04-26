import {Component, OnInit} from '@angular/core';
import {NoteReply} from '../../../core/models/note-reply';
import {NoteReplyService} from '../../../core/services/note-reply.service';
import {AjaxResponse} from '../../../core/models/ajax-response';
import {PageHelper} from '../../../core/models/page-helper';
import {MatDialog} from '@angular/material';
import {UserReplyDialogComponent} from './user-reply-dialog/user-reply-dialog.component';

@Component({
  selector: 'app-user-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  replies: NoteReply[] = [];

  constructor(private replyService: NoteReplyService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.replyService.listNews(1).subscribe(
      (data: AjaxResponse<PageHelper>) => {
        this.replies = data.data.list;
      }
    );
  }

  getDetailed(reply) {
    const dialogRef = this.dialog.open(UserReplyDialogComponent, {
      panelClass: 'full-width',
      width: '800px',
      data: reply
    });
    dialogRef.afterClosed().subscribe(
      data => {
        this.getList();
      }
    );
  }
}
