import { SideCharactersService } from 'src/app/core/service/side-characters.service';
import { ToastrService } from 'ngx-toastr';
import { CharactersService } from './../../../../core/service/characters.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterItem } from 'src/app/modules/characters/models/character-item.model';
import { finalize } from 'rxjs/operators';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Titles } from '../../models/titles.model';
import { Story, StoryForCharacter } from '../../models/story.model';
import { BaseComponent } from 'src/app/core/base.component';
import { SideCharacterDetails } from '../../models/side-characters-details.model';
import { EditSideCharacterDetails } from '../../models/edit-side-character-details.model';

type changeOptions = 'new-character' | 'edit-character' | 'delete-character' | 'story'
  | 'new-chars' | 'edit-side' | 'edit-side-pic';
@Component({
  selector: 'app-change-character-data',
  templateUrl: './change-character-data.component.html',
  styleUrls: ['./change-character-data.component.scss']
})
export class ChangeCharacterDataComponent extends BaseComponent implements OnInit {

  loading = true;

  changeType: string | null;


  charList: CharacterItem[];
  titles: Titles[] | null = null;

  characterWithStoryId: number;
  titlesForStories: Map<number, Titles[]>;
  areTitlesSet = false;

  selectedCharId: number;

  newSideCharForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
    profilePic: new FormControl()
  });

  sideCharacterDetails: SideCharacterDetails;

  editSideCharForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    surname: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    desc: new FormControl('', [
      Validators.required,
      Validators.minLength(25)
    ])
  })

  newProfilePicForm = new FormGroup({
    externalId: new FormControl(''),
    profilePic: new FormControl()
  })

  @ViewChild('sideCharProfilePic', { static: false }) sideCharProfilePic;
  @ViewChild('newProfilePic', { static: false }) newProfilePic;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _characterService: CharactersService,
    private _sideCharacterService: SideCharactersService,
    private _toastrService: ToastrService
  ) {
    super();
  }

  ngOnInit() {
    this.setChangeData();
  }

  setChangeData() {
    if (this._route && this._route.parent && this._route.parent.params) {
      this.subscriptions$.add(
        this._route.params.subscribe(param => {
          this.changeType = param.name;
          if (param.name === 'edit-side' || param.name === 'edit-side-pic') {
            this._route.queryParams.subscribe(queryParam => {
              if (queryParam.id) {
                this.selectedCharId = queryParam.id;
              }
            })
          }
          this.displayInfo(param.name);
        })
      )
    }


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
    this.subscriptions$.add(
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
    )

  }

  getCharactersList() {
    this.loading = true;
    this._characterService
      .getCharacters()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      ).subscribe(charList => {
        this.charList = charList;
      })
  }

  getStoryTitles() {
    this.loading = true;
    this.subscriptions$.add(
      this._characterService.getStoryTitles()
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe(titles => {
          this.titles = titles;
        })
    )

  }

  generateStoryForms(storyForm: NgForm) {
    const map = new Map();
    for (const key in storyForm.controls) {
      if (storyForm.controls.hasOwnProperty(key)) {
        key === 'name' ? this.characterWithStoryId = storyForm.value[key] : null
        if (key !== 'name') {
          const id = +key;
          const value = !!storyForm.value[id];
          if (value && this.titles && this.titles.length > 0) {
            const titleForStory = this.titles.find(t => {
              return t.id === id;
            })
            if (titleForStory) {
              map.set(id, titleForStory.title);
            }
          }
        }
      }
    }
    this.titlesForStories = map;
    if (this.titlesForStories.size > 0 && this.characterWithStoryId) {
      this.areTitlesSet = true;
    } else {
      this._toastrService.warning('Nie uzupełniono poprawnie formularza.')
    }
  }

  createStory(titlesForm: NgForm) {
    this.loading = true;

    const storyToSend = new StoryForCharacter();
    const stories: Story[] = [];
    for (const key in titlesForm.controls) {
      if (titlesForm.controls.hasOwnProperty(key)) {
        const id = +key;
        const value = titlesForm.value[id];
        const story = new Story(id, value);
        stories.push(story);
      }
    }
    storyToSend.characterId = this.characterWithStoryId;
    storyToSend.stories = stories;

    this.subscriptions$.add(
      this._characterService
        .postStoryForCharacter(storyToSend)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(
          _ => {
            this._toastrService.success('Udało się dodać historię!');
          },
          err => {
            if (err.error) {
              this._toastrService.error(err.error)
            }
          })
    )
  }

  getCharacterDetails() {
    this.subscriptions$.add(
      this._sideCharacterService
        .getSideCharacterDetails(this.selectedCharId)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(details => {
          this.sideCharacterDetails = details;
          const name = this.editSideCharForm.get('name');
          const surname = this.editSideCharForm.get('surname');
          const desc = this.editSideCharForm.get('desc');

          if (name) {
            name.setValue(details.sideCharacterName);
          }
          if (surname) {
            surname.setValue(details.sideCharacterSurname);
          }
          if (desc) {
            desc.setValue(details.sideCharacterDesc);
          }
        },
          err => {
            if (err && err.error) {
              this._toastrService.error(err.error);
            }
          })
    )
  }

  updateSideCharInfo() {
    const formValues: { [key: string]: string } = this.editSideCharForm.value;

    if (!this.editSideCharForm.dirty) {
      this._toastrService.warning('Żadne zmiany nie zostały wprowadzone.');
      return;
    }
    const objToSend = new EditSideCharacterDetails();
    objToSend.externalId = +this.selectedCharId;
    objToSend.sideCharacterName = formValues.name;
    objToSend.sideCharacterSurname = formValues.surname;
    objToSend.sideCharacterDesc = formValues.desc;

    this.loading = true;

    this.subscriptions$.add(
      this._sideCharacterService
        .putSideCharacterDetails(objToSend)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe(_ => {
          this._toastrService.success('Udało się zmienić informacje o postaci.');
          this.getCharacterDetails();
        }, err => {
          if (err && err.error) {
            this._toastrService.error(err.error);
          }
        }
        )
    );
  }

  setNewProfilePic() {
    const fileToUpload = this.newProfilePic.nativeElement.files[0];
    if (fileToUpload) {
      const extension = fileToUpload.name.split('.').pop();
      const fileSize = fileToUpload.size / 1024 / 1024;
      const extensionReg = /(jpg|jpeg|gif|png)/i
      if (!extensionReg.test(extension)) {
        return this._toastrService.warning('Niewspierany format pliku.');
      } else if (fileSize > 4) {
        return this._toastrService.warning('Podany plik jest za duży. Maksymalna wielkość pliku to 4MB.');
      } else if (fileSize === 0) {
        return this._toastrService.warning('Podany plik jest pusty lub uszkodzony.');
      }
    }
    const formData = new FormData();
    formData.set('externalId', '' + this.selectedCharId);
    formData.append('profilePic', fileToUpload);
    this.loading = true;
    this.subscriptions$.add(
      this._sideCharacterService
        .postEditProfilePic(formData as any)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(_ => {
          this._toastrService.success('Udało się zmienić profilowe!');
          this._router.navigate(['admin-panel/side']);
        },
          () => {
            this._toastrService.error('Nie udało się zmienić profilowego.');
          })
    )
  }



  displayInfo(changeOption: changeOptions) {
    switch (changeOption) {
      case 'edit-character':
        break;

      case 'story':
        this.getCharactersList();
        this.getStoryTitles();
        break;

      case 'edit-side':
        this.getCharacterDetails();
        break;

      case 'new-chars':
      case 'new-character':
      case 'edit-side-pic':
        this.loading = false;
        break;
    }
  }
}
