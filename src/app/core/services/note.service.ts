import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Note} from 'src/app/core/models/note';
import {environment} from '../../../environments/environment';
import {QuillUploadImageInterface} from '../interface/quill-upload-image.interface';

@Injectable({
  providedIn: 'root'
})
export class NoteService implements QuillUploadImageInterface{
  constructor(private  http: HttpClient) {
  }

  private url = `${environment.apiUrl}/notes/`;

  public getList(currPage) {
    return this.http.get(this.url + 'getList', {params: {currPage: currPage}});
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
