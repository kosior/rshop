import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {JwtService} from '../jwt/jwt.service';
import {User} from '../../models/user.model';
import {Subject} from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/skip';
import {environment} from '../../../environments/environment';


interface ApiAuthResponse {
  user: User;
  token: string;
}

@Injectable()
export class AuthService {
  private loginUrl = environment.apiBaseUrl + 'api-token-auth/';
  private registerUrl = environment.apiBaseUrl + 'register/';
  private refreshTokenUrl = environment.apiBaseUrl + 'api-token-refresh/';

  private userSubject: Subject<User|null> = new ReplaySubject(1);
  public user$ = this.userSubject.asObservable();


  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router,
  ) {
      this.refreshToken();
  }

  _post_auth(data, url) {
    return this.http.post<ApiAuthResponse>(url, data)
      .map(response => {
        if (response.token && response.user) {
          this.userSubject.next(new User(response.user));
          this.jwtService.setTokenAndUsername(response.token);
          return true;
        } else {
          this.userSubject.next(null);
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
    this.userSubject.next(null);
    this.jwtService.removeTokenAndUsername();
    this.router.navigate(['/']);
  }

  refreshToken() {
    if (this.isLoggedIn()) {
      const token = this.jwtService.getToken();
      this._post_auth({token: token}, this.refreshTokenUrl).subscribe();
    }
  }

  isLoggedIn() {
    return this.jwtService.tokenNotExpired();
  }
}
