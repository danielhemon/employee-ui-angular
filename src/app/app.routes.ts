import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './components/guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'create',
    component: CreateEmployeeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update/:id',
    component: CreateEmployeeComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/home' },
];
