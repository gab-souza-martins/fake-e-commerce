import { Injectable } from '@angular/core';
import { CartItem } from '../types/cart-item.type';

@Injectable({
  providedIn: 'root',
})
export class CartStorage {
  setItem(value: CartItem): void {
    try {
      localStorage.setItem('localCart', JSON.stringify(value));
    } catch (e) {
      console.error('Error saving to local storage', e);
    }
  }
}
