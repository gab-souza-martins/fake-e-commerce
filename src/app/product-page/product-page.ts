import { Component, inject, input, signal } from '@angular/core';
import { Item } from '../types/item.type';
import { FakeStore } from '../services/fake-store';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-product-page',
  imports: [],
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
}
