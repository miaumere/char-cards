import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends BaseComponent implements OnInit {

  username = '';

  constructor(
    private _authService: AuthService,
    private _toastr: ToastrService
  ) {
    super();
  }

  ngOnInit() {
    this.username = this.loggedUser ? this.loggedUser.username : null;
  }

  logout() {
    this._authService.logout().subscribe(_ => {
      this._toastr.success('Wylogowano użytkownika.')
    },
      () => {
        this._toastr.error('Nie udało się wylogować użytkownika.')
      }
    )
  }

}
