import {Component, Input} from '@angular/core';
import {ShoppingCartService} from '../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product;
  @Input('show-actions') showActions = true;
  @Input('cartItems') items;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
    console.log(JSON.stringify(this.items));
    if (!this.items) { return 0; }
    const item = this.items[this.product.id.toString()];
    return item ? item.quantity : 0;
  }

}
