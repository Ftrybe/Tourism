import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {User} from '../models/user';
import {UsersService} from '../services/users.service';
import {EMPTY, Observable, of} from 'rxjs';
import {mergeMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDetailResolverService implements Resolve<User> {

  constructor(private userService: UsersService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
    let id =  route.paramMap.get('id');
    if(this.userService.getUserId() === id){
      return this.userService.getUserById(id).pipe(
        take(1),
        mergeMap(user => {
          if (user) {
            return of(user);
          } else {
            this.router.navigate(['../']);
            return EMPTY;
          }
        })
      );
    }else {
      this.router.navigate(['../']);
      return EMPTY;
    }
  }
}
