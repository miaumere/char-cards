import { ToastrService } from 'ngx-toastr';
import { LoggedUser } from './../../model/users/logged-user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCredentials } from 'src/app/model/users/user-credentials.model';
import { Observable, of } from 'rxjs';
import { ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginURL = '/login';
  private logoutURL = '/logout';

  _loggedUser: LoggedUser;

  constructor(
    private http: HttpClient,
    private _toastr: ToastrService,
    private _router: Router
  ) { }

  login(requestData: UserCredentials) {
    return this.http.post<LoggedUser>(this.loginURL, requestData)
      .pipe(
        tap(auth => {
          this._loggedUser = new LoggedUser();
          this._loggedUser.username = auth.username;
          this._loggedUser.password = auth.password;
        })
      )
  }

  logout() {
    this._loggedUser = null;
    return this.http.get(this.logoutURL);
  }

  getLoggedUser(): LoggedUser {
    return this._loggedUser;
  }





}
