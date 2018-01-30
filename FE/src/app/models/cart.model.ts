import {ItemM, Items} from './item.model';

export class Cart {
  items: ItemM[] = [];

  constructor(public itemsMap: Items = {}) {
    for (const itemId of Object.keys(this.itemsMap)) {
      const item = this.itemsMap[itemId];
      this.items.push(new ItemM(item));
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
}
