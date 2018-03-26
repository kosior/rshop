import {Component, OnInit} from '@angular/core';
import {ProductService} from 'shared/services/product/product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from 'shared/models/product.model';
import 'rxjs/add/operator/switchMap';
import {ShoppingCartService} from 'shared/services/shopping-cart/shopping-cart.service';
import {Cart} from 'shared/models/cart.model';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<Cart>;

  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: ShoppingCartService) { }

  ngOnInit() {
    this.cart$ = this.cartService.cart$;
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll()
      .switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category_slug === this.category) :
      this.products;
  }
}
