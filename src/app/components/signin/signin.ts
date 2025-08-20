import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../services/auth/auth-service";

@Component({
  selector: "app-signin",
  standalone: true, 
  imports: [FormsModule, CommonModule], 
  templateUrl: "./signin.html",
  styleUrls: ["./signin.css"],
})
export class SigninComponent {
  private authService = inject(AuthService);

  username: string = "";
  email: string = "";
  password: string = "";

  onSignup() {
    const newUser = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.authService.signup(newUser).subscribe({
      next: (user) => console.log("User signed up:", user),
      error: (err) => console.error("Signup error:", err),
    });
  }
}
