import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {AjaxResponse} from '../models/ajax-response';
import {ChartsData} from '../models/charts-data';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url = `${environment.apiUrl}/dashboard/`;

  constructor(private http: HttpClient) {
  }

  countUsers() {
    return this.http.get(this.url + 'countUsers');
  }

  countNotes() {
    return this.http.get(this.url + 'countNotes');
  }

  countFoods() {
    return this.http.get(this.url + 'countFoods');
  }

  countScenery() {
    return this.http.get(this.url + 'countScenery');
  }

  countAll() {
    return this.http.get(this.url + 'countAll');
  }

  listUserByHalfMonth(): Observable<AjaxResponse> {
    return this.http.get<AjaxResponse>(this.url + 'listUsers');
  }

  listNoteByHalfMonth(): Observable<AjaxResponse> {
    return this.http.get<AjaxResponse>(this.url + 'listNotes');
  }
}
