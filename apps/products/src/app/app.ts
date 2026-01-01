import '@nx-example/shared/header';

import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs/operators';

import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { selectProductById } from '@nx-example/shared/product/state';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private store = inject(Store);

  // Title as a Signal<string>
  title = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      startWith(null),

      // get deepest active route snapshot info
      map(() => this.getDeepestRouteInfo(this.activatedRoute)),

      // if detail route has productId => select product name from store
      switchMap((info) => {
        const productId = info.productId;

        if (productId) {
          return this.store.select(selectProductById(productId)).pipe(
            map((p) => p?.name ?? info.routeTitle ?? 'Product detail')
          );
        }

        // not detail page
        return of(info.routeTitle ?? 'Products');
      }),

      distinctUntilChanged()
    ),
    { initialValue: 'Products' }
  );

  private getDeepestRouteInfo(route: ActivatedRoute): { routeTitle: string | null; productId: string | null } {
    let current: ActivatedRoute | null = route;
    while (current?.firstChild) current = current.firstChild;

    const title = current?.snapshot.data?.['title'];
    const routeTitle = typeof title === 'string' ? title : null;

    const productId = current?.snapshot.paramMap.get('productId');
    return { routeTitle, productId };
  }
}
