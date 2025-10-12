import { Component, inject, input, OnInit, signal } from '@angular/core';
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
export class ItemList implements OnInit {
  fakeStore = inject(FakeStore);
  itemList = signal<Array<Item>>([]);
  filter = input.required<string>();

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
        if (this.filter() === '' || !this.filter) {
          this.itemList.set(i);
        } else {
          this.itemList.set(i.filter((p) => p.category === this.filter().toLowerCase()));
        }
      });
  }
}
