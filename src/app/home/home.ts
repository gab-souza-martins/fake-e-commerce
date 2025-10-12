import { Component } from '@angular/core';
import { ItemList } from '../components/item-list/item-list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ItemList, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
