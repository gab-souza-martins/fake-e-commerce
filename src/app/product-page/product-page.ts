import { Component, inject, input, signal } from '@angular/core';
import { Item } from '../types/item.type';
import { FakeStore } from '../services/fake-store';
import { catchError } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar as fullStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartStorage } from '../services/cart-storage';
import { CartItem } from '../types/cart-item.type';

@Component({
  selector: 'app-product-page',
  imports: [FontAwesomeModule, NgClass, RouterLink],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
})
export class ProductPage {
  constructor(private breakpointService: BreakpointObserver, private cartStorage: CartStorage) {}

  productId = input.required<string>();

  fakeStore = inject(FakeStore);
  product = signal<Item>({
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0,
    },
  });

  flexRow = false;

  ngOnInit(): void {
    this.fakeStore
      .getItems()
      .pipe(
        catchError((e) => {
          console.log(e);
          throw e;
        })
      )
      .subscribe((i) => {
        const product = i.find((p) => p.id.toString() === this.productId());
        if (product) {
          this.product.set(product);
        }
      });

    this.breakpointService
      .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .subscribe((result) => {
        this.flexRow = false;
        if (result.matches) {
          this.flexRow = true;
        }
      });
  }

  get capitalizedCategory() {
    const categoryWords: string[] = this.product().category.split(' ');

    return categoryWords
      .map((i) => (i.length > 0 ? i[0].toUpperCase() + i.substring(1) : ''))
      .join(' ');
  }

  faStar = fullStar;
  faHalfStar = faStarHalfStroke;
  faEmptyStar = emptyStar;
  get stars() {
    return Array(Math.floor(this.product().rating.rate)).fill(0);
  }
  get missingStars() {
    return Array(Math.floor(5 - this.product().rating.rate)).fill(0);
  }

  faCart = faCartShopping;

  addToCart(): void {
    const currentCart: CartItem[] | null = this.cartStorage.getCart();
    let newCart: CartItem[] = [];

    if (currentCart) {
      newCart = currentCart;
    }
    newCart.push({ id: crypto.randomUUID(), itemInfo: this.product() });

    this.cartStorage.setCart(newCart);
  }
}
