import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
    selector: 'app-edit-icon ',
    templateUrl: './edit-icon.component.html',
    styleUrls: ['./edit-icon.component.scss'],
})
export class EditIconComponent extends BaseComponent implements OnInit {
    @Output() clickedEvent = new EventEmitter<true>();
    isUserLogged = false;

    clicked() {
        this.clickedEvent.emit(true);
    }

    constructor(private _authService: AuthService) {
        super();
    }

    ngOnInit(): void {
        this.subscriptions$.add(
            this._authService.isUserLogged$.subscribe((isUserLogged) => {
                this.isUserLogged = isUserLogged;
            })
        );
    }
}
