import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Note} from 'src/app/core/models/note';
import {environment} from '../../../environments/environment';
import {flatMap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  constructor(private  http: HttpClient) {
  }

  private url = `${environment.apiUrl}/notes/`;

  public getList(currPage): Observable<Note[]> {
    const params = {
      currPage: currPage,
      pageSize: '12'
    };
    // return this.http.get<Note[]>(this._url);
    return this.http.post<Note[]>(this.url + 'getList', params);
  }

  public getRandom(): Observable<Note[]> {
    return this.http.get<Note[]>(this.url + 'random');
  }

  public getNote(id): Observable<Note> {
    return this.http.get<Note>(this.url + 'get', {params: {id: id}});
  }

  public update(note): Observable<boolean> {
    return this.http.put<boolean>(this.url + 'update', note);
  }

  public delete(id): Observable<boolean> {
    return this.http.delete<boolean>(this.url + 'del/' + id);
  }

  public add(note): any {
    return this.http.post(this.url + 'add', note);
  }

  public uploadImage(imageFile: string): any {
    return this.http.post(this.url + 'uploadImage', imageFile);
  }
}
