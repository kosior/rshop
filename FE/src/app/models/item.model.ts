export interface Item {
  quantity: number;
  name: string;
  price: number;
}

export class ItemM implements Item {
  id: number;
  quantity: number;
  name: string;
  price: number;

  constructor(id: string, item: Item) {
    this.id = +id;
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
