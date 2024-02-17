/**
 * Title: app.component.ts
 * Author: Professor Krasso
 * Modified by: Justin Barlowe
 * Modified Date: 02/13/2024
 * Date: 8/5/23
 */

// imports statements
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- This router-outlet displays the content of the BaseLayout or AuthLayout components -->
    <router-outlet></router-outlet>
  `,
  styles: []
})

// Export AppComponent
export class AppComponent {
}
