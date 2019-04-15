import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {b} from '@angular/core/src/render3';
import {NotePraise} from '../models/note-praise';
import {Constant} from './constant';

@Injectable({
  providedIn: 'root'
})
export class NotePraiseService {
  public url = `${environment.apiUrl}/praise/`;

  constructor(private http: HttpClient) {
  }

  praise(noteId) {
    return this.http.put(this.url + 'praise', noteId, Constant.httpOptions);
  }

  queryPraise(id): Observable<boolean> {
    return this.http.get<boolean>(this.url + 'state/' + id);
  }

  count(id) {
    return this.http.get(this.url + 'count/' + id);
  }

  queryPraiseAll(): Observable<NotePraise> {
    return this.http.get<NotePraise>(this.url + 'listPraise');
  }

}
