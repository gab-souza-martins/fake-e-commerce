import { Injectable } from '@angular/core';
import { CartItem } from '../types/cart-item.type';

@Injectable({
  providedIn: 'root',
})
export class CartStorage {
  setCart(value: CartItem[]): void {
    try {
      localStorage.setItem('localCart', JSON.stringify(value));
    } catch (e) {
      console.error('Error saving to local storage', e);
    }
  }

  getCart(): CartItem[] | null {
    try {
      const data: string | null = localStorage.getItem('localCart');
      return data ? (JSON.parse(data) as CartItem[]) : null;
    } catch (e) {
      console.error('Error reading from local storage', e);
      return null;
    }
  }

  clearCart(): void {
    try {
      localStorage.removeItem('localCart');
    } catch (e) {
      console.error('Error removing from local storage', e);
    }
  }
}
