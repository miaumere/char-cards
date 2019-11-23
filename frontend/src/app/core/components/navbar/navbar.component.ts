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

  username = this.authService._loggedUser ? this.authService._loggedUser.username : "niezalogowany"

  constructor(
    private _toastr: ToastrService
  ) {
    super();
  }

  ngOnInit() {

  }

  logout() {
    this.authService.logout().subscribe(_ => {
      this._toastr.success('Wylogowano użytkownika.')
    },
      () => {
        this._toastr.error('Nie udało się wylogować użytkownika.')
      }
    )
  }

}
