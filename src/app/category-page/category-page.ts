import { Component, input } from '@angular/core';
import { ItemList } from '../components/item-list/item-list';

@Component({
  selector: 'app-category-page',
  imports: [ItemList],
  templateUrl: './category-page.html',
  styleUrl: './category-page.css',
})
export class CategoryPage {
  category = input.required<string>();
}
