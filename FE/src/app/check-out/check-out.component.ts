import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartService} from '../services/shopping-cart/shopping-cart.service';
import {Cart} from '../models/cart.model';
import {Subscription} from 'rxjs/Subscription';
import {OrderService} from '../services/order/order.service';
import {Order} from '../models/order.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  address = {};
  cart: Cart;
  cartSubscription: Subscription;

  constructor(private cartService: ShoppingCartService, private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.cartSubscription = this.cartService.cart$.subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

  placeOrder() {
    const order = new Order(this.address, this.cart);
    this.orderService.placeOrder(order)
      .subscribe(result => this.router.navigate(['/order-success', result.uuid]));
  }
}
