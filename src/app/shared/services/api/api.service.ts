import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@interfaces/Product';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://smktesting.herokuapp.com/';
  private token = '';

  constructor(private http: HttpClient) {}

  register(username: string, password: string) {
    return this.http.post<{ success: boolean; token: string }>(
      `${this.baseUrl}/api/register`,
      {
        username,
        password,
      }
    );
  }

  login(username: string, password: string) {
    return this.http.post<{ success: boolean; token: string }>(
      `${this.baseUrl}/api/login`,
      { username, password },
      {
        headers: {
          Authorization: `Token ${this.token}`,
        },
      }
    );
  }

  getProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}/api/products`);
  }

  getProductComments(productId: number) {
    return this.http.get(`${this.baseUrl}/api/reviews/${productId}`);
  }

  postComment(productId: number, rate: number, text: string) {
    return this.http.post<{ review_id: number }>(
      `${this.baseUrl}/api/reviews/${productId}`,
      { rate, text },
      {
        headers: {
          Authorization: `Token ${this.token}`,
        },
      }
    );
  }
}
