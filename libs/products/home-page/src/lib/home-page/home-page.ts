import '@nx-example/shared/product/ui';

import { AsyncPipe, CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ProductsState, loadProductsFromMock, productsActions, productsFeature } from '@nx-example/shared/product/state';

import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'products-home-page',
  imports: [CommonModule, RouterLink, AsyncPipe],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageComponent implements OnInit {
  private store = inject<Store<ProductsState>>(Store);

  products$ = this.store.select(productsFeature.selectProducts);
  status$ = this.store.select(productsFeature.selectStatus);

  ngOnInit(): void {
    // dispatch load
    this.store.dispatch(productsActions.load());
    const products = loadProductsFromMock();
    this.store.dispatch(productsActions.loadSuccess({ products }));
  }
}
