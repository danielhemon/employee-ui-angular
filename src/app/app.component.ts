import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';

// Función para cargar los archivos de traducción
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    NgIf,
    NgFor,
    CreateEmployeeComponent,
  ],
})
export class AppComponent {
  title = 'employee-ui-angular';

  constructor(/*private translate: TranslateService*/ private router: Router) {
    //this.translate.setDefaultLang('en');
    //this.translate.use('en'); // Cambiar a 'es' para español
  }

  // Método para cambiar de idioma
  /*changeLanguage(lang: string) {
    this.translate.use(lang);
  }*/

  navigateTo(url: string): void {
    this.router.navigate([url]);
  }
}
