import { Component } from '@angular/core';
import { CartStorage } from '../services/cart-storage';
import { CheckoutItem } from '../components/checkout-item/checkout-item';

@Component({
  selector: 'app-checkout-page',
  imports: [CheckoutItem],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.css',
})
export class CheckoutPage {
  constructor(private cartStorage: CartStorage) {}
  get cartItems() {
    return this.cartStorage.getCart();
  }
}
