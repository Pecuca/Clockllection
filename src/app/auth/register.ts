import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  username = '';
  email = '';
  password = '';
  error = '';
  success = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.error = '';
    this.success = '';
    const res = this.auth.register({ username: this.username.trim(), email: this.email.trim(), password: this.password });
    if (res.ok) {
      this.success = 'Registro exitoso. Ahora puedes iniciar sesión.';
      setTimeout(() => this.router.navigate(['/auth/login']), 800);
    } else {
      this.error = res.message || 'No se pudo registrar.';
    }
  }

  goLogin() {
    this.router.navigate(['/auth/login']);
  }
}
