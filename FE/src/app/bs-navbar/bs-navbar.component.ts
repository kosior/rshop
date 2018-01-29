import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';
import {ShoppingCartService} from '../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  user$: Observable<User>;
  shoppingCartItemCount: number;

  constructor(private auth: AuthService, private cartService: ShoppingCartService) {}

   ngOnInit() {
    this.user$ = this.auth.user$;
    this.cartService.items$
      .subscribe(items => {
        this.shoppingCartItemCount = 0;
        for (const item of Object.keys(items)) {
          this.shoppingCartItemCount += items[item].quantity;
        }
      });
  }

  logout() {
    this.auth.logout();
  }

}
