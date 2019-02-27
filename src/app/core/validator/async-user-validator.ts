import {UsersService} from '../services/users.service';
import {AsyncValidatorFn, FormControl} from '@angular/forms';
import {Injectable} from '@angular/core';
import {timer} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AsyncUserValidator {
  constructor(private userService: UsersService) {
  }

  searchUser(username) {
    return username.length === 11 ? timer(100).pipe(
      switchMap(() => {
        return this.userService.getUsername(username);
      })
    ) : null;
  }

  mobileExistValidator(): AsyncValidatorFn {
    return (control: FormControl): any => {
      return this.searchUser(control.value).pipe(
        map(res => {
          if (res) {
            console.log('mobile asy' + res);
            return {'usernameExist': true};
          }
        })
      );
    };
  }
}
