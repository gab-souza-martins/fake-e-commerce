import { Component, input, signal } from '@angular/core';
import { Item } from '../../types/item.type';

@Component({
  selector: 'app-item-card',
  imports: [],
  templateUrl: './item-card.html',
  styleUrl: './item-card.css',
})
export class ItemCard {
  testItem = input<Item>({
    id: 0,
    title: 'Sapato',
    price: 2000,
    description: 'Tênis top de linha',
    category: 'Sapato',
    image: 'test-shoe.jpeg',
  });
}
