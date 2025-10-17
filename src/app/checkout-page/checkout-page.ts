import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartStorage } from '../services/cart-storage';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBasketShopping, faTruck, faTruckFast, faSun } from '@fortawesome/free-solid-svg-icons';
import { CheckoutItem } from '../components/checkout-item/checkout-item';

@Component({
  selector: 'app-checkout-page',
  imports: [FontAwesomeModule, CheckoutItem, RouterLink, NgClass],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.css',
})
export class CheckoutPage {
  shipping = signal<number>(3.99);

  selectedShipping?: string;

  faBasket = faBasketShopping;
  faTruck = faTruck;
  faTruckFast = faTruckFast;
  faSun = faSun;

  constructor(private cartStorage: CartStorage) {}

  handleShippingSelect(event: Event) {
    this.selectedShipping = (event.target as HTMLInputElement).value;
    this.shipping.set(Number(this.selectedShipping));
  }

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
