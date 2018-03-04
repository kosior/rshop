import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'shared/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  invalidData = false;

  constructor(private router: Router, private service: AuthService) { }

  register(data) {
    this.service.register(data)
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/']);
        } else {
          this.invalidData = true;
        }
      });
  }

}
