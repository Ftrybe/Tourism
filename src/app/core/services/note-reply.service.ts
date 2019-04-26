import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Constant} from './constant';
import {Observable} from 'rxjs';
import {AjaxResponse} from '../models/ajax-response';

@Injectable({
  providedIn: 'root'
})
export class NoteReplyService {

  url = `${environment.apiUrl}/reply/`;

  constructor(private http: HttpClient) {
  }

  save(reply): Observable<AjaxResponse> {
    return this.http.post<AjaxResponse>(this.url + 'save', reply, Constant.httpOptions);
  }

  delete(id) {
    return this.http.delete(this.url + 'delete/' + id);
  }

  get(commentId) {
    return this.http.get(this.url + 'listDetailed', { params: {
      commentId: commentId
      }});
  }
  getReolyList(fromUserId, commentId) {
    return this.http.get(this.url + 'listReply', { params: {
      commentId: commentId,
        fromUserId : fromUserId
      }});
  }

  listNews(pageNum): Observable<AjaxResponse> {
    return this.http.get<AjaxResponse>(this.url + 'listNews', {
      params: {
        pageNum: pageNum
      }
    });
  }

  list(userId, currentPage = '1') {
    return this.http.get(this.url + 'list', {
      params: {
        id: userId,
        currentPage: currentPage
      }
    });
  }

  countUnread() {
    return this.http.get(this.url + 'countUnread');
  }
}
