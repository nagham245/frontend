import { Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin';
import { ItemPageComponent } from './components/item/item-page/components/item/item-page/item-page';
import { authGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SigninComponent },
  {
    path: 'items',
    component: ItemPageComponent,
    canActivate: [authGuard]   
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
