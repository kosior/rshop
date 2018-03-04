import {Component, OnInit} from '@angular/core';
import {AuthService} from 'shared/services/auth/auth.service';
import {Observable} from 'rxjs/Observable';
import {User} from 'shared/models/user.model';
import {ShoppingCartService} from 'shared/services/shopping-cart/shopping-cart.service';
import {Cart} from 'shared/models/cart.model';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  user$: Observable<User>;
  cart$: Observable<Cart>;

  constructor(private auth: AuthService, private cartService: ShoppingCartService) {}

   ngOnInit() {
    this.user$ = this.auth.user$;
    this.cart$ = this.cartService.cart$;
  }

  logout() {
    this.auth.logout();
  }

}
