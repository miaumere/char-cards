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

  loading = true;
  quotes: IQuote[] | null = null;
  isQuoteFormShown = false;


  newQuoteForm = new FormGroup({
    quote: new FormControl('', Validators.required),
    context: new FormControl('', Validators.required)
  });

  charId: number;


  constructor(
    private _toastrService: ToastrService,
    private _characterService: CharactersService,
    private _route: Router,
    private _activatedRoute: ActivatedRoute,
  ) { super(); }

  ngOnInit() {
    this._activatedRoute?.parent?.queryParams
      .subscribe(queryParam => {
        this.charId = +queryParam.id;
      });
    this.getQuotes();

  }


  createNewQuote() {
    this.loading = true;
    const formValues: { [key: string]: string } = this.newQuoteForm.value;
    const objToSend = new NewQuote();
    objToSend.characterId = this.charId;

    for (const [key, value] of Object.entries(formValues)) {
      objToSend[key] = value;
    }
    this.subscriptions$.add(


      this._characterService
        .postNewQuote(objToSend)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe(_ => {
          this._toastrService.success('Udało się dodać nowy cytat!');
          this.getQuotes();
          this.newQuoteForm.reset();
        },
          err => {
            this._toastrService.error(err?.error);
          }));
  }

  getQuotes() {
    this.loading = true;

    this.subscriptions$.add(
      this._characterService
        .getQuotesForCharacter(this.charId)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe(quotes => {
          this.quotes = quotes;
        })
    );

  }

  showQuotesForm() {
    this.isQuoteFormShown = true;
  }

  deleteQuote(quoteId: number) {
    this.loading = true;
    this._characterService.
      deleteQuote(quoteId)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      ).subscribe(_ => {
        this._toastrService.success('Usunięto wybrany cytat.');
        this.getQuotes();
      }, err => {
        this._toastrService.error(err?.error);
      });
  }

  editQuote(quoteId: number, quoteElement: HTMLElement, contextEl: HTMLElement, quoteContainer: HTMLElement) {
    if (!quoteElement.isContentEditable && !contextEl.isContentEditable) {
      quoteElement.setAttribute('contentEditable', 'true');
      contextEl.setAttribute('contentEditable', 'true');
      quoteContainer.classList.add('quote--editable');

      this._toastrService.info('Aby zapisać zmianę, naciśnij jeszcze raz na ikonkę edycji.');
    } else {
      if (quoteElement.textContent && contextEl.textContent) {
        contextEl.removeAttribute('contentEditable');
        quoteElement.removeAttribute('contentEditable');
        quoteContainer.classList.remove('quote--editable');

        const objToSend = new EditQuote();
        objToSend.quoteId = quoteId;
        objToSend.quote = quoteElement.textContent;
        objToSend.context = contextEl.textContent;

        this.loading = true;
        this.subscriptions$.add(
          this._characterService
            .patchQuote(objToSend)
            .pipe(
              finalize(() => {
                this.loading = false;
              })
            ).subscribe(
              _ => {
                this._toastrService.success('Udało się zmienić cytat!');
                this.getQuotes();
              },
              err => {
                this._toastrService.error(err?.error);
              })
        );
      } else {
        this._toastrService.warning('Treść cytatu i kontekst nie mogą być puste!');
      }
    }


  }
}
