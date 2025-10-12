import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProductPage } from './product-page/product-page';
import { CategoryPage } from './category-page/category-page';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'category/:categoryName',
    component: CategoryPage,
  },
  {
    path: 'product/:productId',
    component: ProductPage,
  },
];
