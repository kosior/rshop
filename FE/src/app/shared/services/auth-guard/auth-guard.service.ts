import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    if (this.auth.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login'], {queryParams: {next: state.url}});
    return false;

  }
}
