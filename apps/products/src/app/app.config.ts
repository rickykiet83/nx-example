import {
  ApplicationConfig,
  isDevMode,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';

import { appRoutes } from './app.routes';
import { productsFeature } from '@nx-example/shared/product/state';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(),
    provideStore(),
    provideState(productsFeature),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
  ],
};
