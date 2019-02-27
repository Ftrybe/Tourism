import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = `${environment.apiUrl}/users/`;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
  }

  // 登录
  public login(value: any): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, value, httpOptions).pipe(
      tap(response => {
        if (response && response.token) {
          // login successful, store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('access_token', response.token);
          return of(true);
        } else {
          return of(false);
        }
      }),
      catchError((err) => {
        return of(false);
      })
    );
  }

  // 注册
  public register(value: any): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, JSON.stringify({
      username: value[0],
      password: value[1],
      pconfirm: value[2],
      smsCode: value[3],
      phoneToken: value[4]
    }), httpOptions).pipe(
      tap(response => {
        if (response === 1) {
          // login successful, store username and jwt token in local storage to keep user logged in between page refreshes
          return of(true);
        } else {
          return of(false);
        }
      }),
      catchError((err) => {
        console.log(err);
        return of(false);
      })
    );
  }

  public decodeToken(): Observable<any> {
    return new Observable<any>(observer => {
      const interval = setInterval(() => {
        const user: any = this.jwtHelper.decodeToken(this.jwtHelper.tokenGetter());
        observer.next(user);
      }, 1000);
      return function unsubscribe() {
        clearInterval(interval);
      };
    });
    // console.log(user);
  }

  public getUser(): any {
    const user = this.jwtHelper.decodeToken(this.jwtHelper.tokenGetter());
    return user;
  }

  public getUserId(): any {
    return this.getUser().uid;
  }

  public logout() {
    localStorage.removeItem('access_token');
  }

  // 获取短信验证码
  public getSmsCode(mobile): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/auth/getSmsCode`, mobile, httpOptions).pipe(
      tap(data => {
        if (data) {
          localStorage.setItem('phoneToken', data.phoneToken);
          return of(true);
        } else {
          return of(false);
        }
      }),
      catchError((err) => {
        return of(false);
      })
    );
  }

  public getUsername(username): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/auth/getUsername`, username, httpOptions).pipe(
      tap(data => {
        return data ? of(true) : of(false);
      }),
      catchError((err) => {
        return of(false);
      })
    );
  }

}
