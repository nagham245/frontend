import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { ItemPageComponent } from './components/item/item-page/item.page.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'items', component: ItemPageComponent, canActivate: [authGuard] },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },   // 👈 ضفنا ده

  { path: '**', redirectTo: '/home' }
];
