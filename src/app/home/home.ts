import { Component } from '@angular/core';
import { ItemList } from '../components/item-list/item-list';

@Component({
  selector: 'app-home',
  imports: [ItemList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
