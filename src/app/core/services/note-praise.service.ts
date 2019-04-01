import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {b} from '@angular/core/src/render3';
import {NotePraise} from '../models/note-praise';

@Injectable({
  providedIn: 'root'
})
export class NotePraiseService {
  public url = `${environment.apiUrl}/praise/`;

  constructor(private http: HttpClient) {
  }

  praise(noteId): Observable<boolean> {
    return this.http.post<boolean>(this.url + 'praise', noteId);
  }

  unPraise(noteId): Observable<boolean> {
    return this.http.delete<boolean>(this.url + 'unPraise/' + noteId);
  }

  queryPraise(noteId): Observable<boolean> {
    return this.http.get<boolean>(this.url + 'getPraise', {params: {noteId: noteId}});
  }
  queryPraiseAll(): Observable<NotePraise> {
    return this.http.get<NotePraise>(this.url + 'listPraise');
  }

}
