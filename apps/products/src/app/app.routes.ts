import { HomePageComponent } from '@nx-example/products/home-page';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent
  }
];
