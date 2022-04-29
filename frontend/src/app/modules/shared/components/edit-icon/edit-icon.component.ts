import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-edit-icon [isUserLogged]',
    templateUrl: './edit-icon.component.html',
    styleUrls: ['./edit-icon.component.scss'],
})
export class EditIconComponent implements OnInit {
    @Output() clickedEvent = new EventEmitter<true>();
    @Input() isUserLogged: boolean = false;

    clicked() {
        this.clickedEvent.emit(true);
    }

    constructor() {}

    ngOnInit(): void {}
}
