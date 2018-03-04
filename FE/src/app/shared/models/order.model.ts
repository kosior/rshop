import {Cart} from './cart.model';

export class Order {
  items: any[];

  constructor(public address: any, cart: Cart) {
    this.items = cart.items.map(i => {
        return {
          product: i.id,
          quantity: i.quantity,
        };
      });
  }
}
