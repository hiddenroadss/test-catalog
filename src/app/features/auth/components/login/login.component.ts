import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit(): void {
    this.apiService
      .login(this.username, this.password)
      .subscribe(() => this.router.navigate(['/']));
  }
}
