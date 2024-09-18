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
        name: this.nameFilter,
        position: this.positionFilter,
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

  exportToCSV(): void {
    if (this.employeeList.length) {
      const csvData = this.convertToCSV(this.employeeList);
      this.downloadCSV(csvData, 'employees.csv');
    }
  }

  private convertToCSV(data: Employee[]): string {
    const header = 'ID,Name,Position,Description,Active';
    const rows = data.map(
      (employee) =>
        `${employee.id},${employee.name},${employee.position},${employee.description},${employee.active}`
    );
    return [header, ...rows].join('\n');
  }

  private downloadCSV(csvData: string, filename: string): void {
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
