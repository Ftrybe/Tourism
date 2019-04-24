import {Component, OnInit} from '@angular/core';
import {NoteReply} from '../../../core/models/note-reply';
import {NoteReplyService} from '../../../core/services/note-reply.service';
import {AjaxResponse} from '../../../core/models/ajax-response';
import {PageHelper} from '../../../core/models/page-helper';

@Component({
  selector: 'app-user-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  replies: NoteReply[] = [];

  constructor(private replyService: NoteReplyService) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.replyService.listNews(1).subscribe(
      (data: AjaxResponse<PageHelper>) => {
        this.replies = data.data.list;
        console.log(data);
      }
    );
  }
  getDetailed(commentId){
    this.replyService.get(commentId).subscribe();
  }
  delete(id: string) {

  }
}
