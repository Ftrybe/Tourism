import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {NoteComponent} from '../../pages/note/note.component';
import {Constant} from './constant';
import {NoteComment} from '../models/note-comment';
import {PageHelper} from '../models/page-helper';

@Injectable({
  providedIn: 'root'
})
export class NoteCommentService {

  url = `${environment.apiUrl}/comment/`;

  constructor(private http: HttpClient) {
  }

  save(comment) {
    return this.http.post(this.url + 'save', comment, Constant.httpOptions);
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
