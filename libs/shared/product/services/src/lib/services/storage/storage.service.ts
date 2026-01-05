import { Injectable, inject } from '@angular/core';

import { Product } from '@nx-example/shared/product/types';
import { Router } from '@angular/router';
import { StorageServiceCore } from '@nx-example/web-core';
import { saveCartToStorage } from '@nx-example/shared/cart/services';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private core = new StorageServiceCore();
  private router = inject(Router);

  saveCartToStorage = (product: Product, quantity = 1) => saveCartToStorage(product, quantity);

  getLocalItem(key: string) {
    return this.core.getLocalItem(key);
  }

  setLocalItem(key: string, value: string) {
    this.core.setLocalItem(key, value);
  }

  checkStoragePermission(noPermissionUrl: string) {
    this.core.checkStoragePermission(noPermissionUrl, (url) => this.router.navigateByUrl(url));
  }
}
