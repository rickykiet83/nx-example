import '@nx-example/shared/product/ui';

import { AsyncPipe, CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ProductsState, loadProductsFromMock, productsActions, productsFeature } from '@nx-example/shared/product/state';

import { Product } from '@nx-example/shared/product/types';
import { RouterLink } from '@angular/router';
import { StorageService } from '@nx-example/shared/product/service';
import { Store } from '@ngrx/store';
import { saveCartToStorage } from '@nx-example/shared/cart/services';

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
  private storageService = inject(StorageService);
  products$ = this.store.select(productsFeature.selectProducts);
  status$ = this.store.select(productsFeature.selectStatus);


  ngOnInit(): void {
    // dispatch load
    this.store.dispatch(productsActions.load());
    const products = loadProductsFromMock();
    this.store.dispatch(productsActions.loadSuccess({ products }));
  }

  addProductToCart = (product: Product) => this.storageService.saveCartToStorage(product);
}
