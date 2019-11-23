
import { AuthService } from '../../../../core/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserCredentials } from 'src/app/model/users/user-credentials.model';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/core/base.component';

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
    private _toastr: ToastrService
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
      this._toastr.success('Logowanie zakończone powodzeniem.')
    },
      err => {
        this._toastr.error('Nie udało się zalogować.')
      }
    )

  }

}
