import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base.component';
import { CharactersService } from 'src/app/core/service/characters.service';
import { UpsertQuote } from 'src/app/modules/admin-panel/models/quotes/upsert-quote.model';
import { IQuote } from 'src/app/modules/characters/models/quote.model';

@Component({
    selector: 'app-quotes',
    templateUrl: './quotes.component.html',
    styleUrls: ['./quotes.component.scss'],
})
export class QuotesComponent extends BaseComponent implements OnInit {
    @Input() isUserLogged: boolean = false;
    @Input() quote: IQuote | null = null;
    @Input() charId: number = 0;
    @Input('color') themeColor1: string = '';

    @Output() quotesChangedEvent = new EventEmitter<true>();

    moreQuotes: IQuote[] = [];
    expandQuotes = false;

    editedQuoteId: number | null = null;

    form = new FormGroup({
        quote: new FormControl('', Validators.required),
        context: new FormControl('', Validators.required),
    });

    get canAddMoreQuotes() {
        return !this.moreQuotes.find((q) => q.id === 0);
    }

    constructor(
        private _toastrService: ToastrService,
        private _translate: TranslateService,
        private _characterService: CharactersService
    ) {
        super();
    }

    ngOnInit(): void {
        if (this.isUserLogged) {
            this.getQuotes();
        }
    }

    setEditedQuote(quoteToEdit: IQuote) {
        this.editedQuoteId = quoteToEdit.id;
        this.form.get('quote')?.setValue(quoteToEdit.quote);
        this.form.get('context')?.setValue(quoteToEdit.context);
    }

    addNewQuote() {
        const newQutote: IQuote = {
            id: 0,
            quote: '',
            context: 'string',
        };
        this.moreQuotes.push(newQutote);
        this.editedQuoteId = 0;
        this.form.get('quote')?.setValue('');
        this.form.get('context')?.setValue('');
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

    createNewQuote() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        const objToSend = new UpsertQuote(
            this.form.value,
            this.charId,
            this.editedQuoteId
        );

        this.subscriptions$.add(
            this._characterService.upsertNewQuote(objToSend).subscribe(
                (_) => {
                    this._toastrService.success(
                        this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS')
                    );
                    this.quotesChangedEvent.emit();
                    this.form.reset();
                },
                (err) => {
                    this._toastrService.error(
                        this._translate.instant('TOASTR_MESSAGE.ERROR')
                    );
                }
            )
        );
    }

    insertDeleteInfo() {
        this._toastrService.warning(
            this._translate.instant('TOASTR_MESSAGE.DELETE_INFO')
        );
    }

    cancelEditMode() {
        this.editedQuoteId = 0;
    }

    deleteQuote(quoteId: number) {
        if (quoteId === 0) {
            this.moreQuotes = this.moreQuotes.filter((x) => x.id !== 0);
            return;
        }
        this._characterService
            .deleteQuote(quoteId)
            .pipe(finalize(() => {}))
            .subscribe(
                (_) => {
                    this._toastrService.success(
                        this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS')
                    );
                    this.quotesChangedEvent.emit();
                },
                (err) => {
                    this._toastrService.error(
                        this._translate.instant('TOASTR_MESSAGE.ERROR')
                    );
                }
            );
    }
}
