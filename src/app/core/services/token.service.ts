import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() {
  }

  public getAsyncToken(): string {
    return localStorage.getItem('access_token');
  }
}
