import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/login.service'; // Adjust the path

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: AuthService, private router: Router) {}

  canActivate(): boolean {
    console.log('AuthGuard triggered');
    if (this.loginService.isLoggedIn()) {
      console.log('User is logged in');
      return true;
    } else {
    //   alert('You need to log in to access this page.');
      this.router.navigate(['/login'], { queryParams: { returnUrl: 'business-object-definition' } });      return false;
    }
  }
  
}
