import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteCollectionService {
  public url = `${environment.apiUrl}/collection/`;
  constructor(private http: HttpClient) { }

  getList(){
    this.http.get(this.url + 'list');
  }
}

