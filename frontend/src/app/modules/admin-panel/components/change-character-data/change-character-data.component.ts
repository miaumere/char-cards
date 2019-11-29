import { ToastrService } from 'ngx-toastr';
import { CharactersService } from './../../../../core/service/characters.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterForListItem } from 'src/app/modules/characters/models/character-item.model';
import { finalize } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { CharacterForChange } from '../../models/character-for-change.model';

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
    private _characterService: CharactersService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.setChangeData();
  }

  setChangeData() {
    this._route.params.subscribe(param => {
      this.changeType = param.name;
      this.displayInfo(param.name);
    });

  }

  getCharactersList() { }

  getCharacterDetails() { }


  changeStateOfCharacters(deleteCharForm: NgForm) {
    const charactersToChange: CharacterForChange[] = [];

    for (const key in deleteCharForm.controls) {
      if (deleteCharForm.controls.hasOwnProperty(key)) {
        const element = !!deleteCharForm.value[key];
        charactersToChange.push(new CharacterForChange(+key, element));
      }
    }
    this._characterService.patchCharactersState(charactersToChange).subscribe(_ => {
      this._toastrService.success('Udało się zmienić stan postaci!');
      this.getAllCharacters();
    },
      () => {
        this._toastrService.error('Operacja nie udała się.');
      });

  }

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
      );
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
          this.archivedCharacters = charList.filter((char) => {
            return char.archived === true;
          });
          this.nonArchivedCharacters = charList.filter((char) => {
            return char.archived === false;
          });
        });
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
