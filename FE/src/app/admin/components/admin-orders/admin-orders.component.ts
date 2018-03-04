import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {OrderService} from 'shared/services/order/order.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders$;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orders$ = this.orderService.getOrders();
  }

}
