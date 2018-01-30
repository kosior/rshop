export interface Item {
  quantity: number;
  name: string;
  price: number;
}

export class ItemM implements Item {
  quantity: number;
  name: string;
  price: number;

  constructor(item: Item) {
    this.quantity = item.quantity;
    this.name = item.name;
    this.price = item.price;
  }

  get totalPrice() {
    return this.quantity * this.price;
  }
}

export class Items {
  [id: string]: Item;
}
