import { Component, input } from '@angular/core';

@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
})
export class ProductPage {
  productId = input.required<string>();
}
