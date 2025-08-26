import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, throwError } from "rxjs";
import { UserModel } from "../../models/user.model";
import { jwtDecode } from "jwt-decode";

@Injectable({ providedIn: "root" })
export class AuthService {
  private http = inject(HttpClient);
  private URL = "http://localhost:5000/auth";

  user = new BehaviorSubject<UserModel | null>(null);
  private tokenExpirationTimer: any;

  // ------------------- login -------------------
  login(email: string, password: string) {
    return this.http.post<any>(`${this.URL}/login`, { email, password }).pipe(
      map((res) => this.handleAuthentication(res)),
      catchError(this.handleError)
    );
  }

  // ------------------- signup -------------------
  signup(newUser: FormData | any) {
    return this.http.post<any>(`${this.URL}/signup`, newUser).pipe(
      map((res) => this.handleAuthentication(res)),
      catchError(this.handleError)
    );
  }

  // ------------------- معالجة الـ token -------------------
  private handleAuthentication(response: any) {
    if (!response.token) throw new Error("Token not found in response");

    const decoded: any = jwtDecode(response.token);
    const expirationDate = new Date(decoded.exp * 1000);

    const loggedInUser = new UserModel(
      response.user.email,
      response.user.id,
      response.user.name,
      response.user.image,
      response.token,
      expirationDate
    );

    this.user.next(loggedInUser);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        email: loggedInUser.email,
        id: loggedInUser.id,
        name: loggedInUser.name,
        image: loggedInUser.image,
        _token: loggedInUser.token,
        _tokenExpirationDate: expirationDate,
      })
    );

    const expirationDuration = expirationDate.getTime() - new Date().getTime();
    if (expirationDuration > 0) this.autoLogout(expirationDuration);

    return response.user;
  }

  // ------------------- autoLogin -------------------
  autoLogin() {
    const userDataString = localStorage.getItem("userData");
    if (!userDataString) return;

    const userData = JSON.parse(userDataString);
    const loadedUser = new UserModel(
      userData.email,
      userData.id,
      userData.name,
      userData.image,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);

      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      if (expirationDuration > 0) this.autoLogout(expirationDuration);
    }
  }

  // ------------------- logout -------------------
  logout() {
    this.user.next(null);
    localStorage.removeItem("userData");
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
  }

  // ------------------- autoLogout -------------------
  private autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => this.logout(), expirationDuration);
  }

  // ------------------- handleError -------------------
  private handleError(error: any) {
    let errorResponse = { status: "fail", message: "An unknown error has occurred" };
    if (error.error && error.error.message) {
      errorResponse = { status: "fail", message: error.error.message };
    }
    console.error("HTTP Error:", error);
    return throwError(() => errorResponse);
  }
}
