import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteReplyService {

  url = `${environment.apiUrl}/reply/`;

  constructor(private http: HttpClient) {
  }

  save(reply) {
    return this.http.post(this.url + 'save', reply);
  }

  delete(id) {
    return this.http.delete(this.url + 'delete/' + id);
  }

  get() {

  }

  list(id) {
    return this.http.get(this.url + 'list/' + id);
  }
}
