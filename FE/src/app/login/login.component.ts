import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin = false;

  constructor(private router: Router, private service: AuthService, private route: ActivatedRoute) { }

  login(credentials) {
    const next = this.route.snapshot.queryParamMap.get('next') || '/';
    this.service.login(credentials)
      .subscribe(result => {
        if (result) {
          this.router.navigate([next]);
        } else {
          this.invalidLogin = true;
        }
      });
  }

}
