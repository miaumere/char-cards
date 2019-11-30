import { SideCharForChange } from './../../models/side-char-for-change.model';
import { SideCharactersService } from 'src/app/core/service/side-characters.service';
import { ToastrService } from 'ngx-toastr';
import { CharactersService } from './../../../../core/service/characters.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterForListItem } from 'src/app/modules/characters/models/character-item.model';
import { finalize } from 'rxjs/operators';
import { NgForm, FormGroup } from '@angular/forms';
import { CharacterForChange } from '../../models/character-for-change.model';
import { SideCharacterForListItem } from 'src/app/modules/side-characters/models/side-characters.model';

type changeOptions = 'new-character' | 'edit-character' | 'delete-character' | 'new-chars' | 'edit-chars' | 'delete-chars';
@Component({
  selector: 'app-change-character-data',
  templateUrl: './change-character-data.component.html',
  styleUrls: ['./change-character-data.component.scss']
})
export class ChangeCharacterDataComponent implements OnInit {

  loading = true;

  changeType: string | null;
  archivedCharacters: CharacterForListItem[] = [];
  nonArchivedCharacters: CharacterForListItem[] = [];

  archivedSideChars: SideCharacterForListItem[] = [];
  nonArchivedSideChars: SideCharacterForListItem[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _characterService: CharactersService,
    private _sideCharacterService: SideCharactersService,
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


  changeStateOfCharacters(changeStateOfCharForm: NgForm) {
    const charactersToChange: CharacterForChange[] = [];

    for (const key in changeStateOfCharForm.controls) {
      if (changeStateOfCharForm.controls.hasOwnProperty(key)) {
        const id = +key;
        const value = !!changeStateOfCharForm.value[id];
        const isArchived = !!this.archivedCharacters.find(archivedCharacter => archivedCharacter.id === id);
        const archiveToSet = !!value ? !isArchived : isArchived;
        charactersToChange.push(new CharacterForChange(id, archiveToSet));
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

  changeStateOfSideChars(changeStateOfSideCharsForm: NgForm) {
    const sideCharsToChange: SideCharForChange[] = [];

    for (const key in changeStateOfSideCharsForm.controls) {
      if (changeStateOfSideCharsForm.controls.hasOwnProperty(key)) {
        const id = +key;
        const value = !!changeStateOfSideCharsForm.value[id];
        const isArchived = !!this.archivedSideChars.find(archivedSideChar => archivedSideChar.externalId === id);

        const archiveToSet = !!value ? !isArchived : isArchived;

        sideCharsToChange.push(new SideCharForChange(id, archiveToSet));
      }
    }
    this._sideCharacterService.patchSideCharacterState(sideCharsToChange).subscribe(_ => {

      this._toastrService.success('Udało się zmienić stan postaci pobocznych!');
      this.getAllSideCharacters();
    },
      () => {
        this._toastrService.error('Operacja nie udała się.');
      });
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
          this.archivedCharacters = charList.filter((char) =>
            !!char.archived
          );
          this.nonArchivedCharacters = charList.filter((char) =>
            !char.archived
          );
        });
  }

  getAllSideCharacters() {
    this._sideCharacterService.
      getAllSideCharacters()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(sideChars => {
        this.archivedSideChars = sideChars.filter((sideChar) =>
          !!sideChar.archived
        )
        this.nonArchivedSideChars = sideChars.filter((sideChar) =>
          !sideChar.archived
        )

      }
      )
  }

  displayInfo(changeOption: changeOptions) {
    switch (changeOption) {
      case 'edit-chars':
      case 'new-chars':
        console.log('new-character');
        break;

      case 'edit-character':
        break;

      case 'delete-character':
        this.getAllCharacters();

      case 'delete-chars':
        this.getAllSideCharacters();
    }
  }
}
