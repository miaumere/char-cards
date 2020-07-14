import { TranslateService } from '@ngx-translate/core';
import { CharacterItem } from './../../../characters/models/character-item.model';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { ToastrService } from 'ngx-toastr';
import { CharactersService } from 'src/app/core/service/characters.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Quote } from '@angular/compiler';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NewQuote } from '../../models/quotes/new-quote.model';
import { finalize } from 'rxjs/operators';
import { EditQuote } from '../../models/quotes/edit-quote.model';
import { IQuote } from 'src/app/modules/characters/models/quote.model';

@Component({
  selector: 'app-character-quotes',
  templateUrl: './character-quotes.component.html',
  styleUrls: ['./character-quotes.component.scss']
})

export class CharacterQuotesComponent extends BaseComponent implements OnInit {


  quotes: IQuote[] | null = null;


  newQuoteForm = new FormGroup({
    quote: new FormControl('', Validators.required),
    context: new FormControl('', Validators.required)
  });

  charId: number;

  constructor(
    private _toastrService: ToastrService,
    private _characterService: CharactersService,
    private _activatedRoute: ActivatedRoute,
    private _translate: TranslateService
  ) { super(); }

  ngOnInit() {
    this._activatedRoute?.parent?.queryParams
      .subscribe(queryParam => {
        this.charId = +queryParam.id;
      });
    this.getQuotes();

  }

  insertDeleteInfo() {
    this._toastrService.warning(this._translate.instant('TOASTR_MESSAGE.DELETE_INFO'));
  }


  createNewQuote() {

    const formValues: { [key: string]: string } = this.newQuoteForm.value;
    const objToSend = new NewQuote();
    objToSend.characterId = this.charId;

    for (const [key, value] of Object.entries(formValues)) {
      objToSend[key] = value;
    }
    this.subscriptions$.add(


      this._characterService
        .postNewQuote(objToSend)
        .subscribe(_ => {
          this._toastrService.success(this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS'));
          this.getQuotes();
          this.newQuoteForm.reset();
        },
          err => {
            this._toastrService.error(this._translate.instant('TOASTR_MESSAGE.ERROR'));
          }));
  }

  getQuotes() {


    this.subscriptions$.add(
      this._characterService
        .getQuotesForCharacter(this.charId)
        .subscribe(quotes => {
          this.quotes = quotes;
        })
    );

  }

  deleteQuote(quoteId: number) {

    this._characterService.
      deleteQuote(quoteId)
      .pipe(
        finalize(() => {

        })
      ).subscribe(_ => {
        this._toastrService.success(this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS'));
        this.getQuotes();
      }, err => {
        this._toastrService.error(this._translate.instant('TOASTR_MESSAGE.ERROR'));
      });
  }

  editQuote(quoteId: number, quoteElement: HTMLElement, contextEl: HTMLElement, quoteContainer: HTMLElement) {
    if (!quoteElement.isContentEditable && !contextEl.isContentEditable) {
      quoteElement.setAttribute('contentEditable', 'true');
      contextEl.setAttribute('contentEditable', 'true');
      quoteContainer.classList.add('quote--editable');

      this._toastrService.info(this._translate.instant('TOASTR_MESSAGE.DBLCLICK_INFO'));
    } else {
      if (quoteElement.textContent && contextEl.textContent) {
        contextEl.removeAttribute('contentEditable');
        quoteElement.removeAttribute('contentEditable');
        quoteContainer.classList.remove('quote--editable');

        const objToSend = new EditQuote();
        objToSend.quoteId = quoteId;
        objToSend.quote = quoteElement.textContent;
        objToSend.context = contextEl.textContent;


        this.subscriptions$.add(
          this._characterService
            .patchQuote(objToSend)
            .pipe(
              finalize(() => {

              })
            ).subscribe(
              _ => {
                this._toastrService.success(this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS'));
                this.getQuotes();
              },
              err => {
                this._toastrService.error(this._translate.instant('TOASTR_MESSAGE.ERROR'));
              })
        );
      } else {
        this._toastrService.warning(this._translate.instant('TOASTR_MESSAGE.QUOTE_NAME_WARN'));
      }
    }


  }

}
