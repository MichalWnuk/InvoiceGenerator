import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthService } from './auth.service';
import { IAuthResponseData } from './i-auth-response-data.interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  signUpAsAdmin = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  get switchModeButtonText(): string {
    if (this.isLoginMode) {
      return 'Don\'t have an account yet? Switch to Sign up';
    }
    else {
      return 'Already have an account? Switch to Log in';
    }
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError(): void {
    this.error = null;
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    this.error = null;

    let authObs: Observable<IAuthResponseData>;

    this.isLoading = true;

    authObs = this.authService.sendAuthForm(this.isLoginMode, form.value);

    authObs.subscribe(response => {
      this.isLoading = false;
      this.router.navigate(['/']);
    }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
      this.showErrorAlert(errorMessage);
    });

    form.reset();
  }

  private showErrorAlert(message: string): void {
    const alertCmp: AlertComponent = new AlertComponent();
    alertCmp.message = message;
  }
}
