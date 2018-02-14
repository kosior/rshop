import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {OrderService} from '../services/order/order.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orders$ = this.orderService.getOrders();
  }

}
