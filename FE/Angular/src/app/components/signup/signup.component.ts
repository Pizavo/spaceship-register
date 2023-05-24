import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/models/entities/user/user.service';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {User} from '../../models/entities/user';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ErrorStateMatcher} from '@angular/material/core';

@Component(
  {
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
  })
export class SignupComponent implements OnInit {
  private _passwordValidators: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*\/\-()?])(?=.{8,})/),
  ];

  form: FormGroup = new FormGroup(
    {
      ownershipCode: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern(/\w{8}-\w{4}-[12345]\w{3}-\w{4}-\w{12}/),
        ]),
      forename: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      nickname: new FormControl('', [Validators.required]),
      password: new FormControl('', this._passwordValidators),
      passwordConfirmation: new FormControl('', this._passwordValidators),
    });

  constructor(
    private userService: UserService,
    private notifierService: NotifierService,
    private router: Router,
    private translate: TranslateService,
    public matcher: ErrorStateMatcher,
  ) {}


  ngOnInit(): void {
  }

  onSubmit() {
    const user: User = {
      email: this.form.get('email')!.value,
      forename: this.form.get('forename')!.value,
      ownershipCode: this.form.get('ownershipCode')!.value,
      password: this.form.get('password')!.value,
      surname: this.form.get('surname')!.value,
      nickname: this.form.get('nickname')!.value,
    };

    if (user.password !== this.form.get('passwordConfirmation')!.value) {
      this.translate.get('components.signup.passwordConfirmation.error')
          .subscribe((message: string) => this.notifierService.notify('error', message));

      return;
    }

    this.userService.register(user).subscribe(
      () => {
        this.router.navigate(['/login']);
        this.translate.get('components.signup.success')
            .subscribe((message: string) => this.notifierService.notify('success', message));
      },
    );
  }
}
