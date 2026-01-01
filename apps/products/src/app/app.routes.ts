import { HomePageComponent } from '@nx-example/products/home-page';
import { ProductDetailPageComponent } from '@nx-example/products/product-detail-page';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
    data: { title: 'Products' }
  },
  {
    path: 'product/:productId',
    component: ProductDetailPageComponent,
    data: { title: 'Product detail' },
  },
];
