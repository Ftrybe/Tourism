import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  url = `${environment.apiUrl}/notes/`;

  constructor(private http: HttpClient) {
  }

  listSearch() {
    return this.http.get(this.url + 'list');
  }

  search(arg, currPage) {
    return this.http.get(this.url + 'search', {params: {currentPage: currPage, fileds: arg}});
  }
}
