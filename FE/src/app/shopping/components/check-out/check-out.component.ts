import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from 'shared/services/shopping-cart/shopping-cart.service';
import {Cart} from 'shared/models/cart.model';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<Cart>;

  constructor(private cartService: ShoppingCartService) {}

  ngOnInit() {
    this.cart$ = this.cartService.cart$;
  }
}
