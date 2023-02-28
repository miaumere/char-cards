import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Resolve,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';
import { UserDto } from 'src/app/modules/login/models/user-dto.model';

@Injectable({
    providedIn: 'root',
})
@Injectable()
export class AdminPermissionsResolver implements Resolve<boolean> {
    loggedUser: UserDto | null = null;

    constructor(private _authService: UserService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        // return !!this._authService.getLoggedUser();
        return true;
    }
}
