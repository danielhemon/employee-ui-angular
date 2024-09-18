import { Injectable } from '@angular/core';
import { EmployeeFilters } from '../models/employee-filters';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { EmployeeUpdateRequest } from '../models/employee-update-request';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeeApiUrl = 'http://localhost:5289/api/employee';

  constructor(public http: HttpClient, private authService: AuthService) {}

  public getAll(filters: EmployeeFilters): Observable<Employee[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().append(
      'Authorization',
      `Bearer ${token}`
    );

    let params = new HttpParams();

    // Agregar parámetros de consulta
    if (filters.name) {
      params = params.set('Name', filters.name);
    }

    if (filters.position) {
      params = params.set('Position', filters.position);
    }
    return this.http.get<Employee[]>(this.employeeApiUrl, {
      headers: headers,
      params: params,
    });
  }

  public getById(id: number): Observable<Employee> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().append(
      'Authorization',
      `Bearer ${token}`
    );

    return this.http.get<Employee>(`${this.employeeApiUrl}/${id}`, {
      headers: headers,
    });
  }

  public update(info: EmployeeUpdateRequest, id: number): Observable<Employee> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().append(
      'Authorization',
      `Bearer ${token}`
    );

    return this.http.put<Employee>(`${this.employeeApiUrl}/${id}`, info, {
      headers: headers,
    });
  }

  public create(info: EmployeeUpdateRequest): Observable<Employee> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().append(
      'Authorization',
      `Bearer ${token}`
    );

    return this.http.post<Employee>(this.employeeApiUrl, info, {
      headers: headers,
    });
  }

  public delete(id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().append(
      'Authorization',
      `Bearer ${token}`
    );

    return this.http.delete<any>(`${this.employeeApiUrl}/${id}`, {
      headers: headers,
    });
  }
}
