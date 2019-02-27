import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from '../../../core/models/user.model';
import {environment} from '../../../../environments/environment';
import {catchError, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = `${environment.apiUrl}/users/`;

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    const page = {
      'currPage': '1'
    };
    return this.http.get<User[]>(this.url + 'all', {params: page});
  }

  addUser(user: User) {
    return this.http.post(this.url + 'add', user);
  }

  updateUser(user: User) {
    console.log(user);
    return this.http.put(this.url + 'update', user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.url + 'del/' + id);
  }

}
