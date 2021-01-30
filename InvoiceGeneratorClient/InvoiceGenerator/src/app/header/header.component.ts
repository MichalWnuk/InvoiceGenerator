import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  navbarOpen = false;
  userSub: Subscription;
  isAuthenticated = false;
  userName = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        this.userName = user.getUserName();
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  toggleNavbar(): void {
    this.navbarOpen = !this.navbarOpen;
  }

  onLogout(): void {
    this.authService.logout();
    this.userName = '';
  }
}
