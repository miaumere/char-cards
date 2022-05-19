import { BehaviorSubject } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector:
        'app-char-relations [color] [isUserLogged] [charId] [charFullName]',
    templateUrl: './char-relations.component.html',
    styleUrls: ['./char-relations.component.scss'],
})
export class CharRelationsComponent implements OnInit {
    @Input('color') themeColor1: string = '';
    @Input() isUserLogged: boolean = false;
    @Input() profilePic: string | null = null;
    @Input() charId: number = 0;
    @Input() charFullName: string = '';

    reloadChart$ = new BehaviorSubject(false);

    constructor() {}

    ngOnInit() {}

    reloadChart() {
        this.reloadChart$.next(true);
    }
}
