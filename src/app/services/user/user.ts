// src/app/services/user.service.ts
import { inject, Injectable } from "@angular/core";
import { exhaustMap, map, Observable, take } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../auth/auth-service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private URL = "http://localhost:5000/api/items";

  addItemToFav(itemId: string): Observable<string[]> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${user?.token}`,
        });

        return this.http
          .post<any>(`${this.URL}/add-fav`, { itemId }, { headers })
          .pipe(map((response) => response.favItems));
      })
    );
  }
}
