import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, of} from 'rxjs';
import {Banner} from './banner';
import {catchError, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  url = `${environment.apiUrl}/banner/`;

  constructor(private http: HttpClient) {
  }

  add(file, banner: Banner): any {
    const formData: FormData = this.getFormData(file, banner);
    return this.http.put<any>(this.url + 'add', formData).pipe(
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
        console.log(err);
        return of(false);
      })
    );
  }

  updateFile(file, banner: Banner) {
    const formData: FormData = this.getFormData(file, banner);
    return this.http.post(this.url + 'updateFile', formData).pipe(
      catchError(err => {
        return of(false);
      })
    );
  }
  update(banner: Banner) {
    return this.http.post(this.url + 'update', banner);
  }

  getFormData(file, banner: Banner): FormData {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('title', banner.title);
    formData.append('subtitle', banner.subtitle);
    formData.append('topic', banner.topic);
    formData.append('id', banner.id + '');
    return formData;
  }
}
