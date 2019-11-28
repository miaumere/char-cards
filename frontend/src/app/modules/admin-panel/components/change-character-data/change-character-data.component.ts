import { CharactersService } from './../../../../core/service/characters.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterItem, CharacterForListItem } from 'src/app/model/characters/character-item.model';
import { finalize } from 'rxjs/operators';

type changeOptions = 'new-character' | 'edit-character' | 'delete-character' | 'new-chars' | 'edit-chars' | 'delete-chars';
@Component({
  selector: 'app-change-character-data',
  templateUrl: './change-character-data.component.html',
  styleUrls: ['./change-character-data.component.scss']
})
export class ChangeCharacterDataComponent implements OnInit {

  loading = true;

  changeType: string | null;
  charList: CharacterForListItem[];
  archivedCharacters: CharacterForListItem[] = [];
  nonArchivedCharacters: CharacterForListItem[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _characterService: CharactersService
  ) { }

  ngOnInit() {
    this.setChangeData();
  }

  setChangeData() {
    this._route.params.subscribe(param => {
      this.changeType = param.name;
      this.displayInfo(param.name);
    })

  }

  getCharactersList() { }

  getCharacterDetails() { }

  getCharsList() {
    this._characterService
      .getAllCharacters()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        charList => {
          this.charList = charList;
        }
      )
  }

  getAllCharacters() {
    this._characterService
      .getAllCharacters()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        charList => {
          const archivedChars = charList.filter((char) => {
            return char.archived === true
          })
          console.log(archivedChars)
          // if (archivedChars) {
          //   this.archivedCharacters.push(archivedChars)
          // }
        })
  }

  displayInfo(changeOption: changeOptions) {
    switch (changeOption) {
      case 'edit-chars':
      case 'new-chars':
        console.log('new-character');
        break;

      case 'edit-character':
        this.getCharsList();
        break;

      case 'delete-character':
        this.getAllCharacters();
    }
  }
}
