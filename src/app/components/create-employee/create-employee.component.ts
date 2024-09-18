import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [NgIf, NgClass, FormsModule, ReactiveFormsModule],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.scss',
})
export class CreateEmployeeComponent {
  employeeId: string | null = null;
  employee: Employee = new Employee();

  employeeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      position: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      active: [true, Validators.required],
    });
    if (this.employeeId) {
      this.getEmployeeById();
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      if (this.employeeId) {
        this.updateEmployee();
      } else {
        this.createEmployee();
      }
      console.log('Formulario enviado:', this.employeeForm.value);
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  isInvalidAndTouched(field: string): boolean {
    const control = this.employeeForm.get(field);
    if (control) {
      return control && control.invalid && (control.dirty || control.touched);
    } else {
      return false;
    }
  }

  getEmployeeById() {
    if (this.employeeId) {
      this.employeeService.getById(Number(this.employeeId)).subscribe({
        next: (data) => {
          console.log('response', data);
          this.employee = data;
          this.employeeForm.get('name')?.setValue(data.name);
          this.employeeForm.get('position')?.setValue(data.position);
          this.employeeForm.get('description')?.setValue(data.description);
          this.employeeForm.get('active')?.setValue(data.active);
        },
        error: (e) => {
          console.error('Cannot get employee.');
        },
      });
    }
  }

  updateEmployee() {
    if (this.employeeId) {
      const _employee = {
        name: this.employeeForm.get('name')?.value,
        position: this.employeeForm.get('position')?.value,
        description: this.employeeForm.get('description')?.value,
        active: this.employeeForm.get('active')?.value,
      };
      this.employeeService
        .update(_employee, Number(this.employeeId))
        .subscribe({
          next: (data) => {
            console.log('response', data);
            this.employeeForm.reset();
            this.employee = new Employee();
            this.employeeId = null;
            this.router.navigate(['/home']);
          },
          error: (e) => {
            console.error('Cannot update employee.');
          },
        });
    }
  }

  createEmployee() {
    const _employee = {
      name: this.employeeForm.get('name')?.value,
      position: this.employeeForm.get('position')?.value,
      description: this.employeeForm.get('description')?.value,
      active: this.employeeForm.get('active')?.value,
    };
    this.employeeService.create(_employee).subscribe({
      next: (data) => {
        console.log('response', data);
        this.employeeForm.reset();
        this.employee = new Employee();
        this.employeeId = null;
        this.router.navigate(['/home']);
      },
      error: (e) => {
        console.error('Cannot create employee.');
      },
    });
  }
}
