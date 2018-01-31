import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../services/product/product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../models/product.model';
import 'rxjs/add/operator/switchMap';
import {ShoppingCartService} from '../services/shopping-cart/shopping-cart.service';
import {Subscription} from 'rxjs/Subscription';
import {Cart} from '../models/cart.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: Cart;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: ShoppingCartService) { }

  ngOnInit() {
    this.subscription = this.cartService.cart$
      .subscribe(cart => {
        this.cart = cart;
      });

    this.productService.getAll()
      .switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category_slug === this.category) :
          this.products;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
