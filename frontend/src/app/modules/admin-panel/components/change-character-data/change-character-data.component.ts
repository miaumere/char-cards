import { SideCharForChange } from './../../models/side-char-for-change.model';
import { SideCharactersService } from 'src/app/core/service/side-characters.service';
import { ToastrService } from 'ngx-toastr';
import { CharactersService } from './../../../../core/service/characters.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterForListItem } from 'src/app/modules/characters/models/character-item.model';
import { finalize } from 'rxjs/operators';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
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

  newSideCharForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
    profilePic: new FormControl()
  });

  @ViewChild('sideCharProfilePic', { static: false }) sideCharProfilePic;


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

  createNewSideCharInfo() {
    // console.log(this.newSideCharForm)

    if (this.newSideCharForm.invalid) {
      this._toastrService.warning('Aby kontynuować, wypełnij wszystkie pola.');
    }

    const fileToUpload = this.sideCharProfilePic.nativeElement.files[0];
    if (fileToUpload) {
      const extension = fileToUpload.name.split('.').pop()
      const fileSize = fileToUpload.size / 1024 / 1024
      const extensionReg = /(jpg|jpeg|gif|png)/i
      if (!extensionReg.test(extension)) {
        return this._toastrService.warning('Niewspierany format pliku.');
      } else if (fileSize > 4) {
        return this._toastrService.warning('Podany plik jest za duży. Maksymalna wielkość pliku to 4MB.');
      } else if (fileSize === 0) {
        return this._toastrService.warning('Podany plik jest pusty lub uszkodzony.');
      }
    }
    const formValues: { [key: string]: string } = this.newSideCharForm.value;

    const formData = new FormData();
    for (const [key, value] of Object.entries(formValues)) {
      if (key === 'profilePic') {
        formData.append('profilePic', fileToUpload);
      }
      formData.append(key, value);
    }
    this.loading = true;
    this._sideCharacterService
      .postNewCharacter(formData as any)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(_ => {
        this._toastrService.success('Udało się stworzyć nową postać!')
        this.newSideCharForm.reset();
      },
        () => {
          this._toastrService.error('Nie udało się stworzyć nowej postaci.')
        })

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
    this.loading = true;
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
    this.loading = true;
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

      case 'delete-character':
        this.getAllCharacters();
        break;

      case 'edit-character':
        break;

      case 'new-chars':
      case 'new-character':
        this.loading = false;
        break;

      case 'delete-chars':
        this.getAllSideCharacters();
    }
  }
}
