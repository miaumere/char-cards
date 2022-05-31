import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    Route,
    Resolve,
} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { LoggedUser } from 'src/app/modules/login/models/logged-user.model';
import { skip, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
@Injectable()
export class AdminPermissionsResolver implements Resolve<boolean> {
    loggedUser: LoggedUser | null = null;

    constructor(private _authService: AuthService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return !!this._authService.getLoggedUser();
    }
}
