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
        {
            flag: 'https://flagcdn.com/de.svg',
            language: 'de',
        },
    ];
    constructor(
        public _authService: AuthService,
        private _toastr: ToastrService,
        private _route: Router,
        iconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer,
        public translate: TranslateService
    ) {
        super();
        iconRegistry.addSvgIcon(
            'log-in',
            sanitizer.bypassSecurityTrustResourceUrl(
                '../../../../assets/svg/iconmonstr-key-3.svg'
            )
        );
        iconRegistry.addSvgIcon(
            'user',
            sanitizer.bypassSecurityTrustResourceUrl(
                '../../../../assets/svg/iconmonstr-user-19.svg'
            )
        );

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

    saveLang(lang) {
        localStorage.setItem('language', lang);
        this.translate.use(lang);
    }
}
