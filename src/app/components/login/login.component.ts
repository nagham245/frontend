import { Component, inject, ViewChild } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth/auth-service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./login.html",
  styleUrls: ["./login.css"]
})
export class LoginComponent {
  @ViewChild("loginForm") loginForm!: NgForm;

  loading = false;
  serverError = "";

  private authService = inject(AuthService);

  onSubmit() {
    if (!this.loginForm || this.loginForm.invalid) return;

    this.loading = true;
    this.serverError = "";

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        console.log("Login success:", res);
        this.loading = false;
        this.loginForm.reset();
      },
      error: (err) => {
        console.log("Login error:", err);
        this.loading = false;
        this.serverError = err.message || "Login failed";
      }
    });
  }
}
