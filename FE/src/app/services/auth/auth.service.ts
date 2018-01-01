import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {JwtService} from '../jwt/jwt.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';


interface LoginResponse {
  token: string;
}

@Injectable()
export class AuthService {
  private url = 'http://127.0.0.1:8000/api-token-auth/';

  constructor(private http: HttpClient, private jwtService: JwtService, private router: Router) { }

  login(credentials): Observable<boolean> {
    return this.http.post<LoginResponse>(this.url, credentials)
      .map(response => {
        if (response.token) {
          this.jwtService.setTokenAndUsername(response.token);
          return true;
        } else {
          return false;
        }
      })
      .catch((error: any) => {
        return Observable.of(false);
      });
  }

  logout() {
    this.jwtService.removeTokenAndUsername();
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    return this.jwtService.tokenNotExpired();
  }

}
