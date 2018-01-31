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

  constructor(init?: Partial<ItemM>) {
    Object.assign(this, init);
  }

  get totalPrice() {
    return this.quantity * this.price;
  }
}

export class Items {
  [id: string]: Item;
}
