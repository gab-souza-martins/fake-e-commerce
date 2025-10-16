import { Component } from '@angular/core';
import { CartStorage } from '../services/cart-storage';

// TODO: Apagar e substituir pelo componente de item de checkout
import { CartItemComponent } from '../components/cart-item/cart-item';

@Component({
  selector: 'app-checkout-page',
  imports: [CartItemComponent],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.css',
})
export class CheckoutPage {
  constructor(private cartStorage: CartStorage) {}
  get cartItems() {
    return this.cartStorage.getCart();
  }
}
