import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {NoteCollection} from '../models/note-collection';
import {Constant} from './constant';


@Injectable({
  providedIn: 'root'
})
export class NoteCollectionService {
  public url = `${environment.apiUrl}/collection/`;

  constructor(private http: HttpClient) {
  }

<<<<<<< HEAD
  getList() {
    return this.http.get(this.url + 'list');
  }

  collection(id) {
    return this.http.put(this.url + 'collection', id);
  }

  closeCollection(id) {
    return this.http.delete(this.url + 'del/' + id);
=======
  collection(id) {
    return this.http.put(this.url + 'collection', id, Constant.httpOptions);
  }

  queryCollection(id): Observable<boolean> {
    return this.http.get<boolean>(this.url + 'state/' + id);
  }

  count(id: any) {
    return this.http.get(this.url + 'count/' + id);
  }

  list(page): Observable<NoteCollection[]> {
    return this.http.get<NoteCollection[]>(this.url + 'list', {
      params: {currentPage: page}
    });
>>>>>>> b58823c007b97bc0329aed6ec5fb4ccf79c25ffe
  }
}

