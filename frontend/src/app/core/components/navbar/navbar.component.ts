import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from '../../base.component';
import { UserDto } from 'src/app/modules/login/models/user-dto.model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent extends BaseComponent {
    loggedUser: UserDto | null = null;

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
        public _authService: UserService,
        private _toastr: ToastrService,
        private _route: Router,
        public translate: TranslateService
    ) {
        super();
        translate.addLangs(['en', 'pl']);
        translate.setDefaultLang('en');
    }

    logout() {
        this._authService.logout();
    }

    saveLang(lang: any) {
        localStorage.setItem('language', lang);
        this.translate.use(lang);
    }
}
