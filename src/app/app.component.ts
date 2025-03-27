import { Component } from '@angular/core';
import { SalesScreenComponent } from './sales-screen/sales-screen.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: false,
  imports: [SalesScreenComponent, CommonModule],
  template: `
    <h1>Hello from {{ name }}!</h1>
    <app-sales-screen></app-sales-screen>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>
  `,
})
export class App {
  name = 'Angular';
}
