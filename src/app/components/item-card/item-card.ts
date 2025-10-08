import { Component, input } from '@angular/core';
import { Item } from '../../types/item.type';

@Component({
  selector: 'app-item-card',
  imports: [],
  templateUrl: './item-card.html',
  styleUrl: './item-card.css',
})
export class ItemCard {
  item = input.required<Item>();
}
