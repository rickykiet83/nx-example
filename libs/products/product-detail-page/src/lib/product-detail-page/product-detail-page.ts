import '@nx-example/shared/product/ui';

import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import { loadProductsFromMock, productsActions, productsFeature, selectProductById } from '@nx-example/shared/product/state';

import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';

@Component({
  selector: 'product-detail-product-detail-page',
  imports: [AsyncPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product-detail-page.html',
  styleUrl: './product-detail-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailPageComponent {

  private store = inject(Store);
  private route = inject(ActivatedRoute);

  private productId$ = this.route.paramMap.pipe(
    map((pm) => pm.get('productId') ?? ''),
    distinctUntilChanged()
  );

  status$ = this.store.select(productsFeature.selectStatus);

  // ✅ ensure store has data on direct navigation/refresh
  private ensureLoaded$ = this.store.select(productsFeature.selectProducts).pipe(
    tap((products) => {
      if (!products || products.length === 0) {
        this.store.dispatch(productsActions.load());
        this.store.dispatch(productsActions.loadSuccess({ products: loadProductsFromMock() }));
      }
    })
  );

  product$ = this.productId$.pipe(
    switchMap((id) =>
      this.ensureLoaded$.pipe(
        switchMap(() => this.store.select(selectProductById(id)))
      )
    )
  );
}
