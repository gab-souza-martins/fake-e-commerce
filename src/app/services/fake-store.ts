import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Item } from '../types/item.type';

@Injectable({
  providedIn: 'root',
})
export class FakeStore {
  http = inject(HttpClient);

  getItems() {
    const url = 'https://fakestoreapi.com/products';
    return this.http.get<Array<Item>>(url);
  }
}
