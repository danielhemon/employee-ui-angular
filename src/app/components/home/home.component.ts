import { Component } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    CreateEmployeeComponent,
    NgIf,
    NgxPaginationModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  employeeList: Employee[] = [];
  nameFilter: string = '';
  positionFilter: string = '';
  p: number = 1;

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService
      .getAll({
        name: '',
        position: '',
      })
      .subscribe({
        next: (data) => {
          this.employeeList = data;
        },
        error: (e) => {
          console.log('eeee', e);
          console.error('Cannot get employees.');
          if (e.status === 401) {
            this.router.navigate(['/home']);
          }
        },
      });
  }

  editEmployee(id: number) {
    this.router.navigate(['/update', id]);
  }

  deleteEmployee(id: number) {
    this.employeeService.delete(id).subscribe({
      next: (data) => {
        console.log('response', data);
        this.getEmployees();
      },
      error: (e) => {
        console.error('Cannot Delete employee.');
      },
    });
  }
}
