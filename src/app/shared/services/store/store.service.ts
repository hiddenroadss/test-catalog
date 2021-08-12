import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(
    !!localStorage.getItem('token')
  );

  constructor() {}

  getAuthenticationStatus() {
    return this.isAuthenticated$.asObservable();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setAuthenticationStatus(status: boolean) {
    this.isAuthenticated$.next(status);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.isAuthenticated$.next(!!token);
  }
}
