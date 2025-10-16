import { Component, input } from '@angular/core';
import { CartItem } from '../../types/cart-item.type';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-item',
  imports: [FontAwesomeModule],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItemComponent {
  item = input.required<CartItem>();
  faX = faX;
}
