import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Dycompoent } from '../models/dycompoent';
import { SignComponent } from 'src/app/dialog/sign';

@Injectable()
export class UserService {

    constructor(private authenticationService: AuthenticationService) { }

    isLogin() {
        return this.authenticationService.isLoggedIn() ? new Dycompoent(SignComponent) : new Dycompoent(SignComponent);
    }
}
