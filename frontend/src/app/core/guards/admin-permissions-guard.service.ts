
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { LoggedUser } from 'src/app/modules/login/models/logged-user.model';

@Injectable({
	providedIn: 'root',
})
@Injectable()
export class AdminPermissionsGuard implements CanActivate {
	loggedUser: LoggedUser | null;

	constructor(private _authService: AuthService, private _router: Router) {
	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {

		this._authService.loggedUser$.subscribe(loggedUser => {
			this.loggedUser = loggedUser;
		})

		if (this.loggedUser) {
			return true;
		}

		this._router.navigate(['/login']);
		return false;
	}

}
