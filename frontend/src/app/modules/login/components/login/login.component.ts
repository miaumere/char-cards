import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../../../../core/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserCredentials } from 'src/app/modules/login/models/user-credentials.model';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/core/base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private _authService: AuthService,
    private _toastr: ToastrService,
    private _router: Router,
    private _translate: TranslateService
  ) {
    super()
  }

  ngOnInit() {
  }

  onSubmit() {
    const user = new UserCredentials();
    user.username = this.loginForm.controls['username'].value;
    user.password = this.loginForm.controls['password'].value;

    this._authService.login(user).subscribe(_ => {
      this._toastr.success(this._translate.instant('TOASTR_MESSAGE.LOGIN_SUCCESS'));
      this._router.navigateByUrl('/admin-panel');

    },
      err => {
        this._toastr.error(this._translate.instant('TOASTR_MESSAGE.ERROR'));
      }
    )

  }

}
