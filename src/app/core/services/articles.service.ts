import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Article} from '../models/article';
import {Observable} from 'rxjs';
import {ArticleMap} from '../models/article-map';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  url = `${environment.apiUrl}/articles/`;

  constructor(private http: HttpClient) {
  }


  addArticle(article: Article) {
    return this.http.post(this.url + 'add', article);
  }

  deleteArticle(id) {
    return this.http.delete(this.url + 'del/' + id);
  }

  updateArticle(article) {
    return this.http.put(this.url + 'update', article);
  }

  getArticles(topic) {
    const params = {
      topic: topic
    };
    return this.http.get(this.url + 'all', {params: params});
  }

  getUserById(id: string): Observable<Article> {
    const params = {
      id: id
    };
    return this.http.get<Article>(this.url + 'get', {params: params});
  }

  getMap(id): Observable<ArticleMap> {
    return this.http.get<ArticleMap>(this.url + 'getMap', {params: {articleId: id}});
  }

  saveMap(map: any) {
    return this.http.post(this.url + 'saveMap', map);
  }

  updateMap(map: any) {
    return this.http.put(this.url + 'updateMap', map);
  }
}
