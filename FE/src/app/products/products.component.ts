import {Component} from '@angular/core';
import {ProductService} from '../services/product/product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../models/product.model';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;

  constructor(route: ActivatedRoute, productService: ProductService) {
    productService.getAll()
      .switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category_slug === this.category) :
          this.products;
      });
  }
}
