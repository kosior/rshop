import {ItemM, Items} from './item.model';
import {Product} from './product.model';

export class Cart {
  items: ItemM[] = [];

  constructor(public itemsMap: Items = {}) {
    for (const itemId of Object.keys(this.itemsMap)) {
      const item = this.itemsMap[itemId];
      this.items.push(new ItemM(itemId, item));
    }
  }

  get totalItemsCount() {
    let count = 0;
    for (const item of this.items) {
      count += item.quantity;
    }
    return count;
  }

  get totalPrice() {
    let sum = 0;
    for (const item of this.items) {
      sum += item.totalPrice;
    }
    return sum;
  }

  getQuantity(product: Product) {
    const item = this.itemsMap[product.id.toString()];
    return item ? item.quantity : 0;
  }
}
