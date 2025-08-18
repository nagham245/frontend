import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { ItemPageComponent } from './components/item/item-page/components/item/item-page/item-page';

// استورد مكون الصفحة الرئيسي بدل اللست فقط

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ItemPageComponent],
  template: `<app-item-page></app-item-page>`, // عرض الصفحة كاملة
  styleUrls: ['./app.css'],
})
export class AppComponent {}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient() // ✅ يسمح باستخدام HttpClient
  ]
});
