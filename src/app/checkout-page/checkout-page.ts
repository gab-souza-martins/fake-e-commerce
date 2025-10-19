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
import { LoginService } from '../services/login-service';

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

  constructor(private cartStorage: CartStorage, private loginService: LoginService) {}

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

  get itemPrice(): number {
    let total: number = 0;

    if (this.cartItems) {
      for (let i = 0; i < this.cartItems.length; i++) {
        total += this.cartItems[i].totalPrice;
      }
    }

    return total;
  }

  get interestRate(): number {
    const installments: number = this.installments() > 1 ? this.installments() : 0;
    const rate: number = 1.01 ** installments;

    return this.itemPrice * rate - this.itemPrice;
  }

  get total(): number {
    let total: number = this.itemPrice + this.shipping();

    if (this.payment() === 'credit' && this.installments() > 1) {
      total = total + this.interestRate;
    }

    return total;
  }

  get installmentValue(): number {
    let total: number = this.total;

    if (this.payment() === 'credit' && this.installments() > 1) {
      total = total / this.installments();
    }

    return total;
  }

  finishPurchase() {
    this.cartStorage.clearCart();
  }

  get isLoggedIn(): boolean {
    return this.loginService.getIsLoggedIn();
  }
}
