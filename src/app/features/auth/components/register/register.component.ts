import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@services/api/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  username = '';
  password = '';
  error = '';

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit(): void {
    this.apiService
      .register(this.username, this.password)
      .subscribe((value) => {
        if (value.token) {
          this.router.navigate(['/']);
        } else if (value.message) {
          this.error = value.message;
        }
      });
  }
}
