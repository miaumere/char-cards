import { AuthService } from './../../../../core/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserCredentials } from 'src/app/model/users/user-credentials.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    const user = new UserCredentials();
    user.username = this.loginForm.controls['username'].value;
    user.password = this.loginForm.controls['password'].value;

    console.log(user)
    this._authService.login(user).subscribe(_ => {
      console.log('udało się zalogować')
    },
      err => {
        console.error(err)
      }
    )

  }

}
