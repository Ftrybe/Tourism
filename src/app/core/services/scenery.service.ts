import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Scenery} from '../models/scenery';
import {Observable} from 'rxjs';
import {ArticleMap} from '../models/article-map';
import {AjaxResponse} from '../models/ajax-response';
@Injectable({
  providedIn: 'root'
})
export class SceneryService {
  url = `${environment.apiUrl}/scenery/`;

  constructor(private http: HttpClient) {
  }


  add(scenery: Scenery) {
    return this.http.post(this.url + 'add', scenery);
  }

  delete(id) {
    return this.http.delete(this.url + 'del/' + id);
  }

  update(scenery) {
    return this.http.put(this.url + 'update', scenery);
  }

  list(): Observable<Scenery[]> {
    return this.http.get<Scenery[]>(this.url + 'all');
  }

  getUserById(id: string): Observable<Scenery> {
    const params = {
      id: id
    };
    return this.http.get<Scenery>(this.url + 'get', {params: params});
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

  listOfHome(): Observable<AjaxResponse<Scenery[]>> {
    return this.http.get<AjaxResponse<Scenery[]>>(this.url + 'home');
  }
  uploadImage(file: string): any {
    return this.http.post(this.url + 'uploadImage', file);
  }
}
