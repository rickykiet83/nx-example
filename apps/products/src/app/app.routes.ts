import { HomePageComponent } from '@nx-example/products/home-page';
import { ProductDetailPageComponent } from '@nx-example/products/product-detail-page';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent
  },
  {
    path: 'product/:productId',
    component: ProductDetailPageComponent
  },
];
