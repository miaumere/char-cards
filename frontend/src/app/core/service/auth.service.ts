import { ToastrService } from 'ngx-toastr';
import { LoggedUser } from '../../modules/login/models/logged-user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCredentials } from 'src/app/modules/login/models/user-credentials.model';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private loginURL = '/login';
    private logoutURL = '/logout';
    private reloginURL = '/relogin';

    _loggedUser: LoggedUser | null = null;
    loggedUser$ = new BehaviorSubject<LoggedUser | null>(null);

    isUserLogged$ = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {
        this.relogin();
    }

    login(requestData: UserCredentials) {
        return this.http.post<LoggedUser>(this.loginURL, requestData).pipe(
            tap((auth) => {
                this._loggedUser = new LoggedUser();
                this._loggedUser.username = auth.username;
                this._loggedUser.password = auth.password;

                this.emitLoggedUser();
            })
        );
    }

    relogin() {
        return this.http
            .get<LoggedUser>(this.reloginURL)
            .subscribe((loggedUser) => {
                this._loggedUser = loggedUser;
                this.emitLoggedUser();
            });
    }

    private emitLoggedUser() {
        this.loggedUser$.next(this._loggedUser);
        this.isUserLogged$.next(!!this._loggedUser);
    }

    logout() {
        this._loggedUser = null;
        return this.http.get<void>(this.logoutURL).pipe(
            tap(() => {
                this._loggedUser = null;
                this.isUserLogged$.next(false);
                this.emitLoggedUser();
            })
        );
    }

    getLoggedUser(): LoggedUser | null {
        return this._loggedUser;
    }
}
