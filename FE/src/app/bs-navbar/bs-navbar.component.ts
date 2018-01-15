import {Component} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  user$: Observable<User>;

  constructor(private auth: AuthService) {
    this.user$ = auth.user$;
  }

  logout() {
    this.auth.logout();
  }

}
