import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { mockProducts } from '@nx-example/shared/product/data';

@Component({
  selector: 'products-home-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  products = mockProducts;

  constructor() {
    console.log(this.products);
  }
}
