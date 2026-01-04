import { Injectable, inject } from '@angular/core';

import { Router } from '@angular/router';
import { StorageServiceCore } from '@nx-example/web-core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private core = new StorageServiceCore();
  private router = inject(Router)

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
