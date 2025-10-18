import { Component, input } from '@angular/core';
import { CartItem } from '../../types/cart-item.type';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { CartStorage } from '../../services/cart-storage';

@Component({
  selector: 'app-cart-item',
  imports: [FontAwesomeModule],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItemComponent {
  item = input.required<CartItem>();
  faMinus = faMinus;

  constructor(private cartStorage: CartStorage) {}

  reduceItem(): void {
    const currentCart: CartItem[] | null = this.cartStorage.getCart();
    let newCart: CartItem[] = [];

    if (currentCart) {
      newCart = currentCart;
    }

    const itemIndex = newCart.findIndex(
      (cartItem) => cartItem.itemInfo.id === this.item().itemInfo.id
    );

    if (itemIndex !== -1) {
      if (newCart[itemIndex].quantity > 1) {
        newCart[itemIndex].quantity--;
        newCart[itemIndex].totalPrice =
          newCart[itemIndex].itemInfo.price * newCart[itemIndex].quantity;
      } else {
        newCart.splice(itemIndex, 1);
      }
    }

    this.cartStorage.setCart(newCart);
  }
}
