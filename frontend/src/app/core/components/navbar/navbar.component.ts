import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from '../../base.component';
import { LoggedUser } from 'src/app/modules/login/models/logged-user.model';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends BaseComponent implements OnInit {

  username = '';
  loggedUser: LoggedUser | null = null;

  constructor(
    public _authService: AuthService,
    private _toastr: ToastrService,
    private _route: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    super();
    iconRegistry.addSvgIcon(
      'log-out',
      sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/svg/iconmonstr-log-out-9.svg'));
    iconRegistry.addSvgIcon(
      'log-in',
      sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/svg/iconmonstr-key-3.svg'));
    iconRegistry.addSvgIcon(
      'user',
      sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/svg/iconmonstr-user-19.svg'));

  }

  ngOnInit() {
  }

  logout() {
    this._authService.logout().subscribe(_ => {
      this._toastr.success('Wylogowano użytkownika.')
      this._route.navigate(['/main']);

    },
      () => {
        this._toastr.error('Nie udało się wylogować użytkownika.')
      }
    )
  }

}
