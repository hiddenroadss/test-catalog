import { Component } from '@angular/core';
import { StoreService } from '@services/store/store.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isAuthenticated$: Observable<boolean>;

  constructor(private storeService: StoreService) {
    this.isAuthenticated$ = this.storeService
      .getAuthenticationStatus()
      .pipe(tap((value) => console.log(value)));
  }

  logOut(): void {
    this.storeService.setAuthenticationStatus(false);
    this.storeService.setToken('');
  }
}
