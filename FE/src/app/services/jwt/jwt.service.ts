import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class JwtService {

  constructor(private jwtHelper: JwtHelperService) { }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  setUsername(token: string) {
    const username = this.jwtHelper.decodeToken(token).username;
    localStorage.setItem('username', username);
  }

  removeUsername() {
    localStorage.removeItem('username');
  }

  setTokenAndUsername(token: string) {
    this.setToken(token);
    this.setUsername(token);
  }

  removeTokenAndUsername() {
    this.removeToken();
    this.removeUsername();
  }

  tokenNotExpired() {
    const token: string = this.jwtHelper.tokenGetter();
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

}
