import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProductPage } from './product-page/product-page';
import { CategoryPage } from './category-page/category-page';
import { CheckoutPage } from './checkout-page/checkout-page';
import { PurchaseCompletePage } from './purchase-complete-page/purchase-complete-page';

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
  {
    path: 'checkout',
    component: CheckoutPage,
  },
  {
    path: 'purchase-complete',
    component: PurchaseCompletePage,
  },
];
