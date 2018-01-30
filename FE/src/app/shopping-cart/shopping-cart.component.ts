import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from '../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
    this.cart$ = this.cartService.cart$;
  }
}
