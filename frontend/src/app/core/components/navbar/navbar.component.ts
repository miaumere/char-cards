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
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends BaseComponent implements OnInit {

  username = '';
  loggedUser: LoggedUser | null = null;


  supportedLanguages = [{
    'flag': 'https://restcountries.eu/data/gbr.svg',
    'language': 'en'
  }, {
    'flag': 'https://restcountries.eu/data/pol.svg',
    'language': 'pl'
  }
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
      sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/svg/iconmonstr-key-3.svg'));
    iconRegistry.addSvgIcon(
      'user',
      sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/svg/iconmonstr-user-19.svg'));


    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('en');


    // const lang = translate.getDefaultLang();
    // translate.use(lang.match(/en|pl/) ? lang : 'en');
  }

  ngOnInit() {
  }

  logout() {
    this._authService.logout().subscribe(_ => {
      this._toastr.success('Wylogowano użytkownika.');
      this._route.navigate(['/main']);

    },
      () => {
        this._toastr.error('Nie udało się wylogować użytkownika.');
      }
    );
  }

  saveLang() {
    const item = localStorage.getItem('language');
    if (item) {
      localStorage.removeItem(item);
      localStorage.setItem('language', this.translate.currentLang);
    } else {
      localStorage.setItem('language', this.translate.currentLang);
    }

  }

}
