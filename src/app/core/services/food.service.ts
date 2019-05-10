import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Scenery} from '../models/scenery';
import {Observable} from 'rxjs';
import {ArticleMap} from '../models/article-map';
import {Food} from '../models/food';
@Injectable({
  providedIn: 'root'
})
export class FoodService {
  url = `${environment.apiUrl}/foods/`;

  constructor(private http: HttpClient) {
  }


  add(food: Food) {
    return this.http.post(this.url + 'add', food);
  }

  delete(id) {
    return this.http.delete(this.url + 'del/' + id);
  }

  update(food) {
    return this.http.put(this.url + 'update', food);
  }

  list(): Observable<Food[]> {
    return this.http.get<Food[]>(this.url + 'all');
  }

  getById(id: string): Observable<Food> {
    const params = {
      id: id
    };
    return this.http.get<Food>(this.url + 'get', {params: params});
  }

  getMap(id): Observable<ArticleMap> {
    return this.http.get<ArticleMap>(this.url + 'getMap', {params: {sceneryId: id}});
  }

  saveMap(map: any) {
    return this.http.post(this.url + 'saveMap', map);
  }

  updateMap(map: any) {
    return this.http.put(this.url + 'updateMap', map);
  }

  listOfHome() {
    return this.http.get(this.url + 'home');
  }
  uploadImage(file: string): any {
    return this.http.post(this.url + 'uploadImage', file)
  }
}
