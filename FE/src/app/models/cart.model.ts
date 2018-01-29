import {Items} from './item.model';

export class Cart {
  constructor(public items: Items) {
    this.items = items;
  }

  get totalItemsCount() {
    let count = 0;
    for (const item_key of Object.keys(this.items)) {
      count += this.items[item_key].quantity;
    }
    return count;
  }
}
