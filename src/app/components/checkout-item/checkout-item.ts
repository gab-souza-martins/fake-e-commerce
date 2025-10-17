import { Component, input } from '@angular/core';
import { CartItem } from '../../types/cart-item.type';

@Component({
  selector: 'app-checkout-item',
  imports: [],
  templateUrl: './checkout-item.html',
  styleUrl: './checkout-item.css',
})
export class CheckoutItem {
  item = input.required<CartItem>();
}
