import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  email: string = '';
  userName: string = '';
  password: string = '';

  constructor(
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  onRegister(): void {
    this.registrationService
      .register({
        email: this.email,
        password: this.password,
        userName: this.userName,
      })
      .subscribe((success) => {
        if (success) {
          this.router.navigate(['/home']);
        } else {
          // Maneja el error de inicio de sesión aquí
          console.error('Login failed');
        }
      });
  }
}
