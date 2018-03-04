import {Component, Input} from '@angular/core';
import {ShoppingCartService} from 'shared/services/shopping-cart/shopping-cart.service';
import {Cart} from 'shared/models/cart.model';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product;
  @Input('show-actions') showActions = true;
  @Input('cart') cart: Cart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

}
