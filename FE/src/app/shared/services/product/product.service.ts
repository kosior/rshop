import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Product} from 'shared/models/product.model';

@Injectable()
export class ProductService {
  private productsUrl = environment.apiBaseUrl + 'products/';

  constructor(private http: HttpClient) { }

  create(product) {
    return this.http.post(this.productsUrl, product);
  }

  getAll() {
    return this.http.get<Product[]>(this.productsUrl);
  }

  get(productId) {
    return this.http.get<Product>(this.productsUrl + productId + '/');
  }

  update(productId, product) {
    return this.http.patch(this.productsUrl + productId + '/', product);
  }

  delete(productId) {
    return this.http.delete(this.productsUrl + productId + '/');
  }
}
