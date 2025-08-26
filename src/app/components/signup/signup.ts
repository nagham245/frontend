import { Component, inject, ViewChild } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth/auth-service";

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./signup.html",
  styleUrls: ["./signup.css"],
})
export class SignupComponent {
  loading = false;
  serverError = "";
  serverSuccess = "";
  selectedFile: File | null = null;
  selectedFileName = "";
  passwordMismatch = false;

  private authService = inject(AuthService);
  @ViewChild("signUpForm") signUpForm!: NgForm;

  onFileSelected(e: Event) {
    const input = e.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] || null;
    this.selectedFileName = this.selectedFile?.name || "";
  }

  onSubmit() {
    if (this.signUpForm.invalid) return;

    const { name, email, password, confirmPassword } = this.signUpForm.value;
    this.passwordMismatch = password !== confirmPassword;
    if (this.passwordMismatch) return;

    const fd = new FormData();
    fd.append("name", name);
    fd.append("email", email);
    fd.append("password", password);
    if (this.selectedFile) fd.append("image", this.selectedFile);

    this.loading = true;
    this.serverError = "";
    this.serverSuccess = "";

    this.authService.signup(fd).subscribe({
      next: () => {
        this.loading = false;
        this.serverSuccess = "Account created successfully";
        this.signUpForm.reset();
        this.selectedFile = null;
        this.selectedFileName = "";
      },
      error: (err) => {
        this.loading = false;
        this.serverError = err.error?.message || "Signup failed";
      },
    });
  }
}
