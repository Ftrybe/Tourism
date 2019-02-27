import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Articles} from '../models/articles';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  url = `${environment.apiUrl}/articles/`;

  constructor(private http: HttpClient) {
  }

  getFoods(): Observable<Articles[]> {
    return this.http.get<Articles[]>(this.url + 'foods');
  }

  getScenery(): Observable<Articles[]> {
    return this.http.get<Articles[]>(this.url + 'scenery');
  }

  addArticle(article: Articles) {
    return this.http.post(this.url + 'add', article);
  }

  deleteArticle(id) {
    return this.http.delete(this.url + 'del/' + id);
  }
  updateArticle(article) {
    return this.http.put( this.url + 'update', article);
  }
}
