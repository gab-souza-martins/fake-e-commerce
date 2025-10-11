import { Component, input } from '@angular/core';
import { Item } from '../../types/item.type';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-item-card',
  imports: [FontAwesomeModule],
  templateUrl: './item-card.html',
  styleUrl: './item-card.css',
})
export class ItemCard {
  item = input.required<Item>();
  faStar = faStar;
}
