import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'products-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
