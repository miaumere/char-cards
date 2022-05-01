import { Component, Input, OnInit } from '@angular/core';
import { IQuote } from 'src/app/modules/characters/models/quote.model';

@Component({
    selector: 'app-quotes',
    templateUrl: './quotes.component.html',
    styleUrls: ['./quotes.component.scss'],
})
export class QuotesComponent implements OnInit {
    @Input() isUserLogged: IQuote | null = null;
    @Input() quote: IQuote | null = null;
    @Input('color') themeColor1: string = '';

    constructor() {}

    ngOnInit(): void {}
}
