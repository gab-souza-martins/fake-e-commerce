import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemList } from './components/item-list/item-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ItemList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
