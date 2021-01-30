import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IAuthResponseData } from './i-auth-response-data.interface';
import { LoginModel } from './login.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  sendAuthForm(isLoginMode: boolean, loginModel: LoginModel): Observable<IAuthResponseData> {
    if (!isLoginMode) {
      return this.signup(loginModel.username, loginModel.email, loginModel.password);
    }
    else {
      return this.login(loginModel.username, loginModel.password);
    }
  }

  private signup(username: string, email: string, password: string): Observable<IAuthResponseData> {
    let respObs = new Observable<IAuthResponseData>();

    // if (signUpAsAdmin) {
    //   respObs = this.http.post<IAuthResponseData>('https://localhost:44395/api/Authenticate/RegisterAdmin',
    //     {
    //       username,
    //       email,
    //       password
    //     });
    // }
    // else {
    respObs = this.http.post<IAuthResponseData>('https://localhost:44395/api/Authenticate/Register',
      {
        username,
        email,
        password
      });
    // }

    return respObs.pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.token, resData.expiration, resData.userName);
    }));
  }

  private login(username: string, password: string): Observable<IAuthResponseData> {
    return this.http.post<IAuthResponseData>('https://localhost:44395/api/Authenticate/Login',
      {
        username,
        password
      }).pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(resData.token, resData.expiration, resData.userName);
      }));
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occured!';
    if (!errorResponse.status) {
      return throwError(errorMessage);
    }
    switch (errorResponse.status) {
      case 401:
        errorMessage = 'No such user or incorrect credentials.';
        break;
      case 403:
        errorMessage = 'You are not authorized to view this resource.';
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(token: string, expiration: string, userName: string): void {
    const user = new User(token, new Date(expiration), userName);
    this.user.next(user);
    this.autoLogout(new Date(expiration));
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autologin(): void {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData._token,
      new Date(userData._tokenExpirationDate),
      userData.userName
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      this.autoLogout(new Date(userData._tokenExpirationDate));
    }
  }

  logout(): void {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['./']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogout(expirationDate: Date): void {
    const timeToExpire = expirationDate.getTime() - (new Date()).getTime();
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, timeToExpire);
  }
}
