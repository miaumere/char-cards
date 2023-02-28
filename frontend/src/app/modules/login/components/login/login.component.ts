import { TranslateService } from '@ngx-translate/core';

import { UserService } from '../../../../core/service/user.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/core/base.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
    loginForm = new UntypedFormGroup({
        username: new UntypedFormControl(''),
        password: new UntypedFormControl(''),
    });

    constructor(
        private _userService: UserService,
        private _toastr: ToastrService,
        private _router: Router,
        private _translate: TranslateService
    ) {
        super();
    }

    ngOnInit() {}

    onSubmit() {
        // const user = new UserCredentials();
        // user.username = this.loginForm.controls['username'].value;
        // user.password = this.loginForm.controls['password'].value;
        // console.log('submit');
        // this._userService.login(user).subscribe(
        //     (_) => {
        //         console.log(_);
        //         this._toastr.success(
        //             this._translate.instant('TOASTR_MESSAGE.LOGIN_SUCCESS')
        //         );
        //         // this._router.navigateByUrl('/admin-panel');
        //     },
        //     (err) => {
        //         this._toastr.error(
        //             this._translate.instant('TOASTR_MESSAGE.ERROR')
        //         );
        //     }
        // );
    }
}
