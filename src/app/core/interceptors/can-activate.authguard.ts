import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UsersService} from '../services/users.service';

@Injectable({providedIn: 'root'})
export class CanActivateAuthGuard implements CanActivate {

  constructor(private router: Router, private authService: UsersService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn() && this.authService.getAuthority().toLocaleString().includes('ROLE_ADMIN') ) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url and return false
    this.router.navigate(['/']);
    return false;
  }
}
