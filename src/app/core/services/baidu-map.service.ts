import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaiduMapAddress} from '../models/baidu-map-address';
import {BaiduMapSuggestion} from '../models/baidu-map-suggestion';

@Injectable({
  providedIn: 'root'
})
export class BaiduMapService {
  url = 'http://api.map.baidu.com/geocoder/v2/';
  ak = '8F1HxkUfqSGRywCZYdEZqw4DGLX5glk2';

  constructor(private http: HttpClient) {
  }

  getLocation(address): Observable<BaiduMapAddress> {
    return this.http.jsonp<BaiduMapAddress>(this.url + '?address=' + address + '&output=json&ak=' + this.ak + '&callback=showLocation',
      'callback');
  }

  getSuggestion(address: string, city: string = '罗源县'): Observable<BaiduMapSuggestion> {
    return this.http.jsonp<BaiduMapSuggestion>('http://api.map.baidu.com/place/v2/suggestion?query=' + address + '&region=' + city
      + '&city_limit=true&output=json&ak=' + this.ak, 'callback');
  }
}
