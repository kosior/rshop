import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class OrderService {
  private saveOrderUrl = environment.apiBaseUrl + 'orders/';

  constructor(private http: HttpClient) { }

  saveOrder(order) {
    this.http.post(this.saveOrderUrl, order).subscribe();
  }

}
