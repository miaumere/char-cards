import { SideCharForChange } from './../../models/side-char-for-change.model';
import { SideCharactersService } from 'src/app/core/service/side-characters.service';
import { ToastrService } from 'ngx-toastr';
import { CharactersService } from './../../../../core/service/characters.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterForListItem, CharacterItem } from 'src/app/modules/characters/models/character-item.model';
import { finalize } from 'rxjs/operators';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CharacterForChange } from '../../models/character-for-change.model';
import { SideCharacterForListItem } from 'src/app/modules/side-characters/models/side-characters.model';
import { Titles } from '../../models/titles.model';
import { Story, StoryForCharacter } from '../../models/story.model';

type changeOptions = 'new-character' | 'edit-character' | 'delete-character' | 'story'
  | 'new-chars' | 'edit-chars' | 'delete-chars';
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

  charList: CharacterItem[];
  titles: Titles[] | null = null;

  characterWithStoryId: number;
  titlesForStories: Map<number, Titles[]>;
  areTitlesSet = false;


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

    console.log("ccd initedQ!!!!"
    )
    this.setChangeData();
  }

  setChangeData() {
    if (this._route && this._route.parent && this._route.parent.params) {

      this._route.params.subscribe(param => {
        console.log(param.name)
        this.changeType = param.name;
        this.displayInfo(param.name);

      });
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
    this._characterService.getStoryTitles()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      ).subscribe(titles => {
        this.titles = titles;
      })

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
  }

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

  // changeStateOfSideChars(changeStateOfSideCharsForm: NgForm) {
  //   const sideCharsToChange: SideCharForChange[] = [];

  //   for (const key in changeStateOfSideCharsForm.controls) {
  //     if (changeStateOfSideCharsForm.controls.hasOwnProperty(key)) {
  //       const id = +key;
  //       const value = !!changeStateOfSideCharsForm.value[id];
  //       const isArchived = !!this.archivedSideChars.find(archivedSideChar => archivedSideChar.externalId === id);

  //       const archiveToSet = !!value ? !isArchived : isArchived;

  //       sideCharsToChange.push(new SideCharForChange(id, archiveToSet));
  //     }
  //   }
  //   this._sideCharacterService.patchSideCharacterState(sideCharsToChange).subscribe(_ => {

  //     this._toastrService.success('Udało się zmienić stan postaci pobocznych!');
  //     this.getAllSideCharacters();
  //   },
  //     () => {
  //       this._toastrService.error('Operacja nie udała się.');
  //     });
  // }


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

      case 'story':
        this.getCharactersList();
        this.getStoryTitles();
        break;

      case 'new-chars':
      case 'new-character':
        this.loading = false;
        break;

      case 'edit-chars':
      case 'delete-chars':
        this.getAllSideCharacters();
        break;
    }
  }
}
