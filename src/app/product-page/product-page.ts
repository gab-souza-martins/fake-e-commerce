import { Component, inject, input, signal } from '@angular/core';
import { Item } from '../types/item.type';
import { FakeStore } from '../services/fake-store';
import { catchError } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar as fullStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-product-page',
  imports: [FontAwesomeModule],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
})
export class ProductPage {
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
}
