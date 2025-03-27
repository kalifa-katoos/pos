import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // Remove standalone component

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
