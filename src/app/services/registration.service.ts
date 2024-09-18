import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from '../models/user-data';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private accountApiUrl = 'http://localhost:5289/api/account';

  constructor(public http: HttpClient) {}

  public register(userData: UserData): Observable<any> {
    return this.http.post<any>(`${this.accountApiUrl}/register`, userData);
  }
}
