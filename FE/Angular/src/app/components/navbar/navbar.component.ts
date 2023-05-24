import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {UserService} from '../../services/models/entities/user/user.service';

@Component({
             selector: 'app-navbar',
             templateUrl: './navbar.component.html',
             styleUrls: ['./navbar.component.scss'],
           })
export class NavbarComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
  ) { }

  public isLoggedIn = () => this.authService.isAuthenticated;

  ngOnInit(): void {
  }

  public logout(): void {
    this.userService.logout();
  }
}
