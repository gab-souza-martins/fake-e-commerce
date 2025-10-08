import { Component, inject, OnInit, signal } from '@angular/core';
import { FakeStore } from '../../services/fake-store';
import { Item } from '../../types/item.type';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-item-list',
  imports: [],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css',
})
export class ItemList implements OnInit {
  fakeStore = inject(FakeStore);
  itemList = signal<Array<Item>>([]);

  ngOnInit(): void {
    this.fakeStore
      .getItems()
      .pipe(
        catchError((e) => {
          console.log(e);
          throw e;
        })
      )
      .subscribe((i) => this.itemList.set(i));
  }
}
