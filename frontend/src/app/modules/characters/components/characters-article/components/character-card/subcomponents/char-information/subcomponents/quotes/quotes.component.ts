import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/core/base.component';
import { CharactersService } from 'src/app/core/service/characters.service';
import { IQuote } from 'src/app/modules/characters/models/quote.model';

@Component({
    selector: 'app-quotes',
    templateUrl: './quotes.component.html',
    styleUrls: ['./quotes.component.scss'],
})
export class QuotesComponent extends BaseComponent implements OnInit {
    @Input() isUserLogged: IQuote | null = null;
    @Input() quote: IQuote | null = null;
    @Input() charId: number = 0;

    @Input('color') themeColor1: string = '';

    moreQuotes: IQuote[] = [];
    expandQuotes = false;
    constructor(
        private _toastrService: ToastrService,
        private _characterService: CharactersService,
        private _activatedRoute: ActivatedRoute,
        private _translate: TranslateService
    ) {
        super();
    }

    ngOnInit(): void {
        if (this.isUserLogged) {
            this.getQuotes();
        }
    }

    toggleEditMode() {
        // this.subscriptions$.add(
        //   this.
        // )
    }

    getQuotes() {
        if (this.quote) {
            this.subscriptions$.add(
                this._characterService
                    .getQuotesForCharacter(this.charId)
                    .subscribe((quotes) => {
                        this.moreQuotes = quotes;
                    })
            );
        }
    }

    createNewQuote() {}
}
