import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiUrl = '  https://landingpage-ic9garoz9-umds-projects-76f3b139.vercel.app/api/users';

  constructor(private _http: HttpClient) { }

  // Save user details signup
  signup(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/signup`, data);
  } 
}