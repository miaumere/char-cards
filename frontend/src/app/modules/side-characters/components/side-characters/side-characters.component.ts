import { element } from 'protractor';
import { NgForm } from '@angular/forms';
import { IBook } from './../../../admin-panel/models/book.model';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { SideCharactersService } from 'src/app/core/service/side-characters.service';
import { finalize } from 'rxjs/operators';
import { SideCharacter } from '../../models/side-character.model';
import { CharactersService } from 'src/app/core/service/characters.service';
import { ICharacterItem } from 'src/app/modules/characters/models/character-item.model';
import { SearchSideParams } from '../../models/search-side-params.model';

@Component({
  selector: 'app-side-characters',
  templateUrl: './side-characters.component.html',
  styleUrls: ['./side-characters.component.scss']
})
export class SideCharactersComponent extends BaseComponent implements OnInit {
  sideCharacters: SideCharacter[];
  books: IBook[] | null = null;
  characters: ICharacterItem[]
  loading = true;

  constructor(
    private _sideCharactersService: SideCharactersService,
    private _charactersService: CharactersService
  ) {
    super();
  }

  ngOnInit() {
    this.getSideCharacters();
    this.getBooks();
    this.getCharacterList();
  }

  getSideCharacters() {
    this.subscriptions$.add(
      this._sideCharactersService
        .getSideCharacters()
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe(sideCharacters => {
          this.sideCharacters = sideCharacters;
        })
    )
  }

  getBooks() {
    this.subscriptions$.add(
      this._sideCharactersService
        .getBooks()
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe(books => {
          this.books = books;
        })
    )
  }

  getCharacterList() {
    this.subscriptions$.add(
      this._charactersService.getCharacters()
        .subscribe(characters => {
          this.characters = characters;
        })
    )

  }

  search(form: NgForm) {
    const searchParams: SearchSideParams = new SearchSideParams();
    const booksIds: number[] = [];

    for (const controlKey in form.controls) {
      if (form.controls.hasOwnProperty(controlKey)) {
        const element = form.controls[controlKey];
        console.log(controlKey)
        if (controlKey.includes('book__') && !!element.value) {
          const controlId = +controlKey.replace('book__', '');
          booksIds.push(controlId);
        } else if (controlKey.includes('name')) {
          searchParams.charName = element.value;
        } else if (controlKey.includes('relationTo')) {

        }

      }
    }
    searchParams.books = booksIds;

    console.log('wyszukiwanie!');
  }

}
