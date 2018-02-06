import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class OrderService {
  private saveOrderUrl = environment.apiBaseUrl + 'orders/';

  constructor(private http: HttpClient) { }

  saveOrder(order): Observable<any> {
    return this.http.post(this.saveOrderUrl, order);
  }

}
