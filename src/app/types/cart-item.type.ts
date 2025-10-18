import { Item } from './item.type';

export interface CartItem {
  id: string;
  itemInfo: Item;
  quantity: number;
  totalPrice: number;
}
