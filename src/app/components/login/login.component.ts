import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userName: string = '';
  password: string = '';

  apiErrors: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService
      .login({ userName: this.userName, password: this.password })
      .subscribe((success) => {
        if (success) {
          this.router.navigate(['/home']); // Redirige al usuario a la página de inicio después de iniciar sesión
          this.apiErrors = false;
        } else {
          // Maneja el error de inicio de sesión aquí
          console.error('Login failed');
          this.apiErrors = true;
        }
      });
  }
}
