import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _toastr: ToastrService
  ) { }

  ngOnInit() {
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
