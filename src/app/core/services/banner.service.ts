import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, of} from 'rxjs';
import {Banner} from '../models/banner';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  url = `${environment.apiUrl}/banner/`;

  constructor(private http: HttpClient) {
  }

  add(banner: Banner): any {
    return this.http.put<any>(this.url + 'add', banner).pipe(
      catchError(err => {
        return of(false);
      })
    );
  }

  getAll(): Observable<Banner[]> {
    return this.http.get<any>(this.url + 'all');
  }

  delete(id: number) {
    return this.http.delete(this.url + 'delete/' + id).pipe(
      catchError((err) => {
        return of(false);
      })
    );
  }

  update(banner: Banner) {
    return this.http.post(this.url + 'update', banner);
  }


  getBanner(topic): Observable<Banner> {
     return this.http.post<Banner>(this.url + 'getBanner', topic);
  }
}
