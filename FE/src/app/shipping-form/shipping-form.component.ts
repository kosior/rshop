import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../models/order.model';
import {OrderService} from '../services/order/order.service';
import {Router} from '@angular/router';
import {Cart} from '../models/cart.model';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
  @Input('cart') cart: Cart;
  address = {};

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
  }

  placeOrder() {
    const order = new Order(this.address, this.cart);
    this.orderService.placeOrder(order)
      .subscribe(result => this.router.navigate(['/order-success', result.uuid]));
  }

}
