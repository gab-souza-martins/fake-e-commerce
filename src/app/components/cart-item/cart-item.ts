import { Component, input } from '@angular/core';
import { CartItem } from '../../types/cart-item.type';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItemComponent {
  item = input.required<CartItem>();
}
