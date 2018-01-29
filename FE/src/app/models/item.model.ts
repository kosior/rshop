export interface Item {
  quantity: number;
}

export class Items {
  [id: string]: Item;
}
