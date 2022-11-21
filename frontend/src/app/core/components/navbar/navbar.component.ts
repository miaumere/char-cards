import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from '../../base.component';
import { LoggedUser } from 'src/app/modules/login/models/logged-user.model';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent extends BaseComponent implements OnInit {
    username = '';
    loggedUser: LoggedUser | null = null;

    supportedLanguages = [
        {
            flag: 'https://flagcdn.com/us.svg',
            language: 'en',
        },
        {
            flag: 'https://flagcdn.com/pl.svg',
            language: 'pl',
        },
    ];
    constructor(
        public _authService: AuthService,
        private _toastr: ToastrService,
        private _route: Router,
        public translate: TranslateService
    ) {
        super();
        translate.addLangs(['en', 'pl']);
        translate.setDefaultLang('en');
    }

    ngOnInit() {}

    logout() {
        this._authService.logout().subscribe(
            (_) => {
                this._toastr.success(
                    this.translate.instant('TOASTR_MESSAGE.LOGOUT_SUCCESS')
                );
                this._route.navigate(['/main']);
            },
            () => {
                this._toastr.error(
                    this.translate.instant('TOASTR_MESSAGE.ERROR')
                );
            }
        );
    }

    saveLang(lang: any) {
        localStorage.setItem('language', lang);
        this.translate.use(lang);
    }
}
