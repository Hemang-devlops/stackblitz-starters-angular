import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LogIn, SignUp } from '../app/data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(data: SignUp) {
    this.http
      .post('http://localhost:3000/users', data, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }
      });
  }

  reloadUser(): Observable<boolean> {
    return of(!!localStorage.getItem('user'));
  }

  userLogIn(data: LogIn) {
    this.http
      .get(
        `http://localhost:3000/users?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        if (result && result.body && result.body.length > 0) {
          this.isLoginError.emit(false);
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        } else {
          console.log('user login failed.');
          this.isLoginError.emit(true);
        }
      });
  }
}
