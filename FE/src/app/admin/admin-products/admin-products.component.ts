import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product/product.service';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: Product[];
  filteredProducts: Product[];

  constructor(private productService: ProductService) {
    this.productService.getAll()
      .subscribe(products => this.filteredProducts = this.products = products);
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) : this.products;

  }

  ngOnInit() {
  }

}
