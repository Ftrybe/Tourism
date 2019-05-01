import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../models/user';
import {AuthorityName} from '../models/authority-name.enum';
import {Constant} from '../models/constant';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = `${environment.apiUrl}/users/`;
  auth = `${environment.apiUrl}/auth/`;
  // 刷新资料
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  refreshInfo(user) {
    this.change.emit(user);
  }

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
  }

  getUsers(): Observable<User[]> {
    const page = {
      'currPage': '1'
    };
    return this.http.get<User[]>(this.url + 'all', {params: page});
  }

  addUser(user: User) {
    return this.http.post(this.url + 'add', user);
  }

  updateUser(user: User): any {
    return this.http.put(this.url + 'update', user);
  }

  changeInfo(user): any {
    return this.http.put(this.url + 'change', user);
  }

  deleteUser(id: string) {
    return this.http.delete(this.url + 'del/' + id);
  }

  // 登录
  public login(value: any): Observable<boolean> {
    return this.http.post<any>(this.auth + 'login', value, Constant.httpOptions).pipe(
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
    return this.http.post<any>(this.auth + 'register', JSON.stringify({
      username: value[0],
      password: value[1],
      pconfirm: value[2],
      smsCode: value[3],
      phoneToken: value[4]
    }), Constant.httpOptions).pipe(
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


  public getUser(): any {
    const user = this.jwtHelper.decodeToken(this.jwtHelper.tokenGetter());
    return user;
  }

  public getUserId(): any {
    return this.getUser() ? this.getUser().uid : null;
  }

  public getUserById(id): Observable<User> {
    const parmes = {
      id: id
    };
    return this.http.get<User>(this.url + 'user', {params: parmes});
  }

  public isLoggedIn(): boolean {
    if (this.jwtHelper.isTokenExpired(this.jwtHelper.tokenGetter())) {
      localStorage.removeItem('access_token');
    }
    return this.getUser();
  }

  public getAuthority(): AuthorityName[] {
    return this.jwtHelper.decodeToken(this.jwtHelper.tokenGetter()).authorities;
  }

  public logout() {
    localStorage.removeItem('access_token');
  }

  // 获取短信验证码
  public getSmsCode(mobile): Observable<boolean> {
    return this.http.post<any>(this.auth + 'getSmsCode', mobile, Constant.httpOptions).pipe(
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

  // 获取登录用户信息
  public getSelf(): Observable<User> {
    return this.http.get<User>(this.url + 'self');
  }

  // 获取本地用户名
  public getUsername() {
    return localStorage.getItem(this.getUserId() + 'nickname');
  }

  // 获取用户名，判断用户是否被注册
  public isExistUsername(username): Observable<boolean> {
    return this.http.post<any>(this.auth + 'getUsername', username, Constant.httpOptions).pipe(
      tap((data: boolean) => {
        return of(data);
      }),
      catchError((err) => {
        return of(false);
      })
    );
  }

  // 更改头像
  changePicture(picture: any): Observable<boolean> {
    return this.http.put<boolean>(this.url + 'changePicture', picture, Constant.httpOptions).pipe(
      tap(state => {
        if (state) {
          return of(true);
        } else {
          return of(false);
        }
      }),
      catchError((err) => {
          return of(false);
        }
      )
    );
  }

  // 获得发表得游记列表
  getPublish() {
    return this.http.get(this.url + 'listNote');
  }

  lockUser(id: string) {
    return this.http.put(this.url + 'lock', id, Constant.httpOptions);
  }
}
