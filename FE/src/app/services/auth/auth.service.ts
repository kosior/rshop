import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {JwtService} from '../jwt/jwt.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';


interface ApiAuthResponse {
  token: string;
}

@Injectable()
export class AuthService {
  private loginUrl = 'http://127.0.0.1:8000/api-token-auth/';
  private registerUrl = 'http://127.0.0.1:8000/register/';


  constructor(private http: HttpClient, private jwtService: JwtService, private router: Router) { }

  _post_auth(data, url) {
    return this.http.post<ApiAuthResponse>(url, data)
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

  register(data): Observable<boolean> {
    return this._post_auth(data, this.registerUrl);
  }

  login(credentials): Observable<boolean> {
    return this._post_auth(credentials, this.loginUrl);
  }

  logout() {
    this.jwtService.removeTokenAndUsername();
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    return this.jwtService.tokenNotExpired();
  }

}
