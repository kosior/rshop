import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../models/product.model';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Subject} from 'rxjs/Subject';
import {Items} from '../../models/items.model';


interface ApiCartResponse {
  uuid: string;
  user: number;
  created: string;
}


@Injectable()
export class ShoppingCartService {
  private cartsUrl = environment.apiBaseUrl + 'carts/';
  private itemsSubject: Subject<Items> = new ReplaySubject(1);
  public items$ = this.itemsSubject.asObservable();

  constructor(private http: HttpClient) { }

  private getItemsUrl(cartId: string): string {
    return this.cartsUrl + cartId + /items/;
  }

  private create() {
    return this.http.post<ApiCartResponse>(this.cartsUrl, {});
  }

  public initializeItems() {
    return this.getOrCreateCartId()
      .take(1)
      .switchMap(cartId => this.http.get<Items>(this.getItemsUrl(cartId)))
      .subscribe(items => { this.itemsSubject.next(items); });
  }

  private getOrCreateCartId(): Observable<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return Observable.of(cartId);
    }

    return this.create()
      .switchMap(result => {
        localStorage.setItem('cartId', result.uuid);
        return result.uuid;
      });
  }

  private updateProductQuantity(productId: number, quantity: 1 | -1) {
    this.getOrCreateCartId()
      .take(1)
      .subscribe(cartId => {
        this.http.post<Items>(this.getItemsUrl(cartId), {product: productId, quantity: quantity})
          .do(items => { this.itemsSubject.next(items); })
          .subscribe();
      });
  }

  addToCart(product: Product) {
    this.updateProductQuantity(product.id, 1);
  }

  removeFromCart(product: Product) {
    this.updateProductQuantity(product.id, -1);
  }
}
