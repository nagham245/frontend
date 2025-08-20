import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./login.html",
  styleUrls: ["./login.css"],
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  errorMessage: string = "";

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = "Please enter email and password";
      return;
    }
    this.errorMessage = "";
    alert(`Login successful! Welcome ${this.email}`);
  }
}
