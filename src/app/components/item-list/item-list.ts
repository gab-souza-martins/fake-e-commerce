import { Component, computed, effect, inject, input, OnInit, signal } from '@angular/core';
import { FakeStore } from '../../services/fake-store';
import { Item } from '../../types/item.type';
import { catchError } from 'rxjs';
import { ItemCard } from '../item-card/item-card';

@Component({
  selector: 'app-item-list',
  imports: [ItemCard],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css',
})
export class ItemList {
  fakeStore = inject(FakeStore);
  itemList = signal<Array<Item>>([]);
  filter = input.required<string>();

  filteredItems = computed(() => {
    const c = this.filter()?.trim();
    if (!c) {
      return this.itemList();
    }
    return this.itemList().filter((p) => p.category === c);
  });

  constructor() {
    effect(() => {
      this.fakeStore
        .getItems()
        .pipe(
          catchError((e) => {
            console.log(e);
            throw e;
          })
        )
        .subscribe((i) => {
          this.itemList.set(i);
        });
    });
  }
}
