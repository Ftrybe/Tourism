import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {NoteCollection} from '../models/note-collection';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class NoteCollectionService {
  public url = `${environment.apiUrl}/collection/`;

  constructor(private http: HttpClient) {
  }

  collection(id) {
    return this.http.put(this.url + 'collection', id, httpOptions);
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
  }
}

