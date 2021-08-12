import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@interfaces/Product';
import { RegistrationResponse } from '@interfaces/RegistrationResponse';
import { Review } from '@interfaces/Review';
import { StoreService } from '@services/store/store.service';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://smktesting.herokuapp.com';

  constructor(private http: HttpClient, private storeService: StoreService) {}

  register(
    username: string,
    password: string
  ): Observable<RegistrationResponse> {
    return this.http
      .post<RegistrationResponse>(`${this.baseUrl}/api/register/`, {
        username,
        password,
      })
      .pipe(
        tap((value) => {
          if (value.token) {
            this.storeService.setToken(value.token);
          }
        })
      );
  }

  login(username: string, password: string): Observable<RegistrationResponse> {
    return this.http
      .post<{ success: boolean; token: string }>(`${this.baseUrl}/api/login/`, {
        username,
        password,
      })
      .pipe(
        tap((value) => {
          if (value.token) {
            this.storeService.setToken(value.token);
          }
        })
      );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/api/products`);
  }

  getProductComments(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/api/reviews/${productId}`);
  }

  postComment(
    productId: number,
    rate: number,
    text: string
  ): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(
      `${this.baseUrl}/api/reviews/${productId}`,
      { rate, text },
      {
        headers: {
          Authorization: `Token ${this.storeService.getToken()}`,
        },
      }
    );
  }
}
