import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/models/entities/user/user.service';
import {AuthenticationRequest} from '../../models/http/requests/authentication-request';

@Component({
             selector: 'app-login',
             templateUrl: './login.component.html',
             styleUrls: ['./login.component.scss'],
           })
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit(): void {
  }

  onSubmit() {
    const login: AuthenticationRequest = {
      email: this.form.get('email')!.value,
      password: this.form.get('password')!.value,
    };

    this.userService.authenticate(login);
  }
}
