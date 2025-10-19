import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgClass } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faX,
  faCartShopping,
  faUser,
  faTrash,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';
import { CartStorage } from '../../services/cart-storage';
import { CartItemComponent } from '../cart-item/cart-item';
import { CartItem } from '../../types/cart-item.type';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgClass, FontAwesomeModule, CartItemComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  faBars = faBars;
  faX = faX;
  faCart = faCartShopping;
  faUser = faUser;
  faTrash = faTrash;
  faCreditCard = faCreditCard;

  desktopNavigationActive = false;
  mobileNavigationActive = false;
  cartOpen = false;
  userOpen = false;

  constructor(
    private breakpointService: BreakpointObserver,
    private cartStorage: CartStorage,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.breakpointService
      .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .subscribe((result) => {
        this.desktopNavigationActive = false;
        if (result.matches) {
          this.desktopNavigationActive = true;
          this.mobileNavigationActive = false;
        }
      });
  }

  clearCart(): void {
    this.cartStorage.clearCart();
  }

  get cartItems(): CartItem[] | null {
    return this.cartStorage.getCart();
  }

  get itemQuantity(): number {
    let quantity: number = 0;

    if (this.cartItems) {
      for (let i = 0; i < this.cartItems.length; i++) {
        quantity += this.cartItems[i].quantity;
      }
    }

    return quantity;
  }

  get isLoggedIn(): boolean {
    return this.loginService.getIsLoggedIn();
  }
}
