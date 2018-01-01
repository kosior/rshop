import { Component } from '@angular/core';
import {AuthService} from '../services/auth/auth.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  username: string;

  constructor(public auth: AuthService) {
    this.username = localStorage.getItem('username');
  }

}
