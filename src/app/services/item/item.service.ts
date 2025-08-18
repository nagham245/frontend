import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Item } from '../../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:5000/items'; 

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getItem(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  createItem(item: Item, imageFile: File): Observable<Item> {
    const formData = new FormData();
    formData.append('name', item.name);
    formData.append('price', item.price.toString());
    formData.append('description', item.description);
    formData.append('image', imageFile);

    return this.http.post<Item>(this.apiUrl, formData).pipe(
      catchError(this.handleError)
    );
  }

  updateItem(id: string, item: Item, imageFile?: File): Observable<Item> {
    const formData = new FormData();
    formData.append('name', item.name);
    formData.append('price', item.price.toString());
    formData.append('description', item.description);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.http.put<Item>(`${this.apiUrl}/${id}`, formData).pipe(
      catchError(this.handleError)
    );
  }

  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Backend returned error:', error);
    return throwError(() => new Error(error.message || 'Something went wrong'));
  }
}
