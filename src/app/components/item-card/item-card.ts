import { Component, input } from '@angular/core';
import { Item } from '../../types/item.type';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar as fullStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-item-card',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './item-card.html',
  styleUrl: './item-card.css',
})
export class ItemCard {
  item = input.required<Item>();

  faStar = fullStar;
  faHalfStar = faStarHalfStroke;
  faEmptyStar = emptyStar;

  get stars() {
    return Array(Math.floor(this.item().rating.rate)).fill(0);
  }
  get missingStars() {
    return Array(Math.floor(5 - this.item().rating.rate)).fill(0);
  }
}
