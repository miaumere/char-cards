import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { UserService } from 'src/app/core/service/user.service';

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

    constructor(private _authService: UserService) {
        super();
    }

    ngOnInit(): void {
        this.subscriptions$.add(
            this._authService.user$.subscribe((user) => {
                this.isUserLogged = !!user;
            })
        );
    }
}
