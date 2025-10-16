import { Component, input } from '@angular/core';
import { CartItem } from '../../types/cart-item.type';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { CartStorage } from '../../services/cart-storage';

@Component({
  selector: 'app-cart-item',
  imports: [FontAwesomeModule],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItemComponent {
  item = input.required<CartItem>();
  faX = faX;

  constructor(private cartStorage: CartStorage) {}

  removeItem(): void {
    const currentCart: CartItem[] | null = this.cartStorage.getCart();
    let newCart: CartItem[] = [];

    if (currentCart) {
      newCart = currentCart;
    }
    newCart = newCart.filter((i) => i.id !== this.item().id);

    this.cartStorage.setCart(newCart);
  }
}
