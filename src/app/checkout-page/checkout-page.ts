import { Component, signal } from '@angular/core';
import { CartStorage } from '../services/cart-storage';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { CheckoutItem } from '../components/checkout-item/checkout-item';

@Component({
  selector: 'app-checkout-page',
  imports: [FontAwesomeModule, CheckoutItem],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.css',
})
export class CheckoutPage {
  shipping = signal<number>(4.99);
  faBasket = faBasketShopping;

  constructor(private cartStorage: CartStorage) {}

  get cartItems() {
    return this.cartStorage.getCart();
  }

  get itemPrice() {
    let total: number = 0;

    if (this.cartItems) {
      for (let i = 0; i < this.cartItems.length; i++) {
        total += this.cartItems[i].itemInfo.price;
      }
    }

    return total;
  }

  get total() {
    return this.itemPrice + this.shipping();
  }
}
