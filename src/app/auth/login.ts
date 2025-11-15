import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.error = '';
    const ok = this.auth.login(this.email.trim(), this.password);
    if (ok) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Credenciales inválidas.';
    }
  }

  goRegister() {
    this.router.navigate(['/auth/register']);
  }
}
