import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() {
  }

  public getAsyncToken(): string {
    return  localStorage.getItem('access_token');
  }
}
