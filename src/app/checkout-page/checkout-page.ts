import { Component, computed, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartStorage } from '../services/cart-storage';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBasketShopping,
  faTruck,
  faTruckFast,
  faSun,
  faReceipt,
  faQrcode,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';
import { CheckoutItem } from '../components/checkout-item/checkout-item';

@Component({
  selector: 'app-checkout-page',
  imports: [FontAwesomeModule, CheckoutItem, RouterLink, NgClass],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.css',
})
export class CheckoutPage {
  shipping = signal<number>(3.99);
  payment = signal<string>('boleto');
  installments = signal<number>(1);

  enableBuying = computed(() => {
    if (!this.shipping || this.shipping() <= 0 || !this.payment || this.payment() === '') {
      return false;
    }
    return true;
  });

  faBasket = faBasketShopping;
  // *Shipping
  faTruck = faTruck;
  faTruckFast = faTruckFast;
  faSun = faSun;
  // *Payment
  faReceipt = faReceipt;
  faQrcode = faQrcode;
  faCreditCard = faCreditCard;

  constructor(private cartStorage: CartStorage) {}

  get cartItems() {
    return this.cartStorage.getCart();
  }

  handleShippingSelect(event: Event) {
    this.shipping.set(Number((event.target as HTMLInputElement).value));
  }
  handlePaymentSelect(event: Event) {
    this.payment.set((event.target as HTMLInputElement).value);
  }
  handleChangeInstallments(event: Event) {
    this.installments.set(Number((event.target as HTMLInputElement).value));
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
