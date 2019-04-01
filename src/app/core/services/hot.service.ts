import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotService {
  private _url = `${environment.apiUrl}/hots/`;

  constructor(private http: HttpClient) {
  }


}
