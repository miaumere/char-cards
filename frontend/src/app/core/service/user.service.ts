import { IUserDto, UserDto } from '../../modules/login/models/user-dto.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { tap } from 'rxjs/operators';
import { getUserFromJWT } from '../utils/get-user-from-jwt.function';
import { ILoginRequest } from 'src/app/modules/login/models/login-request.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly _baseUrl = '/api/User';
    public readonly user$ = new BehaviorSubject<UserDto | null>(null);

    constructor(private http: HttpClient, private _router: Router) {
        this.user$.next(getUserFromJWT());
    }

    login(request: ILoginRequest): Observable<string> {
        return this.http
            .post(this._baseUrl, request, {
                responseType: 'text',
            })
            .pipe(
                tap((token: any) => {
                    localStorage.setItem('authToken', token);
                    this.user$.next(getUserFromJWT());
                })
            );
    }

    logout(): void {
        localStorage.removeItem('authToken');
        this.user$.next(null);
        this._router.navigate(['./login']);
    }
}
