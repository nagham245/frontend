import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { ItemPageComponent } from './components/item/item-page/components/item/item-page/item-page';
import { SigninComponent } from './components/signin/signin';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ItemPageComponent, SigninComponent, LoginComponent],
  template: `
    <app-item-page></app-item-page>
    <app-signin></app-signin>
        <app-login></app-login>

  `,
  styleUrls: ['./app.css'],
})
export class AppComponent {}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()]
});
