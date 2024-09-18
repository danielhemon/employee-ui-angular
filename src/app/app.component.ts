import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Función para cargar los archivos de traducción
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet],
})
export class AppComponent {
  title = 'employee-ui-angular';

  constructor(private translate: TranslateService) {
    // Estableciendo idioma por defecto
    this.translate.setDefaultLang('en');
    this.translate.use('en'); // Cambiar a 'es' para español
  }

  // Método para cambiar de idioma
  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
