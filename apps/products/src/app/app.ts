import '@nx-example/shared/header';

import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { filter, map, startWith } from 'rxjs/operators';

import { RouterModule } from '@angular/router';
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

  // ✅ title as a Signal<string>
  title = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      startWith(null), // ensure it runs once on initial load
      map(() => this.getDeepestTitle(this.activatedRoute) ?? 'Products')
    ),
    { initialValue: 'Products' }
  );

  private getDeepestTitle(route: ActivatedRoute): string | null {
    let current: ActivatedRoute | null = route;

    // Walk down to the deepest active child
    while (current?.firstChild) {
      current = current.firstChild;
    }

    const title = current?.snapshot.data?.['title'];
    return typeof title === 'string' ? title : null;
  }
}
