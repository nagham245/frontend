import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';   
import { RouterModule } from '@angular/router';   // 👈 أضفنا دي
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, LoginComponent],  // 👈 أضفنا RouterModule هنا
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent { }
