import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProductPage } from './product-page/product-page';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'product/:productId',
    component: ProductPage,
  },
];
