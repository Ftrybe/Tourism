import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {NoteComponent} from '../../pages/note/note.component';
import {Constant} from '../models/constant';
import {NoteComment} from '../models/note-comment';
import {PageHelper} from '../models/page-helper';
import {error} from '@angular/compiler/src/util';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {AjaxResponse} from '../models/ajax-response';

@Injectable({
  providedIn: 'root'
})
export class NoteCommentService {

  url = `${environment.apiUrl}/comment/`;

  constructor(private http: HttpClient) {
  }

  save(comment): Observable<AjaxResponse> {
    return this.http.post<AjaxResponse>(this.url + 'save', comment, Constant.httpOptions);
  }

  delete(id) {
    return this.http.delete(this.url + 'delete/' + id);
  }

  get() {

  }

  getList(currentPage, noteId): Observable<PageHelper<NoteComment>> {
    return this.http.get<PageHelper<NoteComment>>(this.url + 'list', {
      params: {
        currentPage: currentPage,
        noteId: noteId
      }
    });
  }
}
