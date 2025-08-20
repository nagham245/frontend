import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, throwError } from "rxjs";
import { UserModel } from "../../models/user.model";
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: "root",
})
export class AuthService {
  private http = inject(HttpClient);
  private URL = "http://localhost:5000/auth"; 

  user = new BehaviorSubject<UserModel | null>(null);
  private tokenExpirationTimer: any;

  login(email: string, password: string) {
    return this.http.post<any>(`${this.URL}/login`, { email, password }).pipe(
      map((response) => {
        if (response.token) {
          const decoded: any = jwtDecode(response.token);
          const expirationDate = new Date(decoded.exp * 1000);

          const loggedInUser = new UserModel(
            decoded.email,
            decoded.id,
            response.token,
            expirationDate
          );

          this.user.next(loggedInUser);
          localStorage.setItem("userData", JSON.stringify(loggedInUser));

          this.autoLogout(expirationDate.getTime() - new Date().getTime());

          return response.user;
        } else {
          throw new Error("Token not found in response");
        }
      }),
      catchError(this.handleError)
    );
  }

  signup(newUser: any) {
    return this.http.post<any>(`${this.URL}/signup`, newUser).pipe(
      map((response) => {
        if (response.token) {
          const decoded: any = jwtDecode(response.token);
          const expirationDate = new Date(decoded.exp * 1000);

          const loggedInUser = new UserModel(
            decoded.email,
            decoded.id,
            response.token,
            expirationDate
          );

          this.user.next(loggedInUser);
          localStorage.setItem("userData", JSON.stringify(loggedInUser));

          this.autoLogout(expirationDate.getTime() - new Date().getTime());

          return response.user;
        } else {
          throw new Error("Token not found in response");
        }
      }),
      catchError(this.handleError)
    );
  }

  autoLogin() {
    const userDataString = localStorage.getItem("userData");
    if (!userDataString) return;

    const userData = JSON.parse(userDataString);
    const loadedUser = new UserModel(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._expiresIn)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);

      const expirationDuration =
        new Date(userData._expiresIn).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem("userData");
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  private autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(error: any) {
    let errorResponse = {
      status: "fail",
      message: "An unknown error has occurred",
    };

    if (error.error && error.error.message) {
      errorResponse = {
        status: "fail",
        message: error.error.message,
      };
    }

    console.error("HTTP Error:", error);
    return throwError(() => errorResponse);
  }
}
