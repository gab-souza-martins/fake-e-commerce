import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemCard } from './components/item-card/item-card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ItemCard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('fake-e-commerce');
}
