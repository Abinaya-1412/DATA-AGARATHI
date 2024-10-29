import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '  https://landingpage-ic9garoz9-umds-projects-76f3b139.vercel.app/api/users';
  constructor(private router: Router, private http: HttpClient) {}

  // login API call
  login(email: string, password: string): Observable<boolean> {
    return this.http.post<{ isAuthenticated: boolean, token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map(response => {
          if (response.isAuthenticated) {
            // Save the token in localStorage
            localStorage.setItem('token', response.token);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  clearTokenOnRefresh() {
    localStorage.removeItem('token'); // Remove token when the page is refreshed
  }
}
