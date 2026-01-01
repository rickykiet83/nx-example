import '@nx-example/shared/header';

import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
}
