import { SideCharactersService } from 'src/app/core/service/side-characters.service';
import { ToastrService } from 'ngx-toastr';
import { CharactersService } from './../../../../core/service/characters.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterItem } from 'src/app/modules/characters/models/character-item.model';
import { finalize, withLatestFrom } from 'rxjs/operators';
import { NgForm, FormGroup, FormControl, Validators, FormArray, Form } from '@angular/forms';
import { Titles } from '../../models/titles.model';
import { Story, StoryForCharacter } from '../../models/story.model';
import { BaseComponent } from 'src/app/core/base.component';
import { SideCharacterDetails } from '../../models/side-characters-details.model';
import { EditSideCharacterDetails } from '../../models/edit-side-character-details.model';
import { Book } from '../../models/book.model';

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

  books: Book[];

  characterWithStoryId: number;
  titlesForStories: Map<number, Titles[]>;
  areTitlesSet = false;

  selectedCharId: number;
  newSideCharForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
    books: new FormArray([]),
    profilePic: new FormControl()
  });

  sideCharacterDetails: SideCharacterDetails;
  detailsBooksIds: number[] = [];

  editSideCharForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    surname: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    books: new FormArray([]),
    desc: new FormControl('', [
      Validators.required,
      Validators.minLength(25)
    ])
  });

  newProfilePicForm = new FormGroup({
    externalId: new FormControl(''),
    profilePic: new FormControl()
  });

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
            });
          }
          this.displayInfo(param.name);
        })
      );
    }


  }

  onCheckChange(event: any, type: 'new-chars' | 'edit-chars') {
    let formArray: FormArray | null = null;

    switch (type) {
      case 'new-chars':
        formArray = this.newSideCharForm.get('books') as FormArray;
        break;

      case 'edit-chars':
        formArray = this.editSideCharForm.get('books') as FormArray;
        break;

    }

    if (!!formArray) {
      if (event.target.checked) {
        formArray.push(new FormControl(+event.target.value));
      } else {
        const controlsArray = formArray.controls;
        for (const [index, ctrl] of Object.entries(controlsArray)) {
          const i = +index;
          const controlValue = +ctrl.value;
          const targetValue = +event.target.value;

          if (controlValue === targetValue) {
            formArray.removeAt(i);
            break;
          }
        }
      }
      console.log('wartość: ', formArray.value.toString());
      this.detailsBooksIds = formArray.value;
    }

  }

  setBookValue(bookId) {
    const foundBook = this.sideCharacterDetails.books.find(b => {
      return b.externalId === bookId;
    });

    if (foundBook) {
      return true;
    } else {
      return false;
    }
  }

  createNewSideCharInfo() {
    console.log(this.newSideCharForm);

    if (this.newSideCharForm.invalid) {
      this._toastrService.warning('Aby kontynuować, wypełnij wszystkie pola.');
    }

    const fileToUpload = this.sideCharProfilePic.nativeElement.files[0];
    if (fileToUpload) {
      const extension = fileToUpload.name.split('.').pop();
      const fileSize = fileToUpload.size / 1024 / 1024;
      const extensionReg = /(jpg|jpeg|gif|png)/i;
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
      } else if (key === 'books') {
        formData.append('books', value.toString());
      } else {
        formData.append(key, value);
      }
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
          this._toastrService.success('Udało się stworzyć nową postać!');
          this.newSideCharForm.reset();
          this._router.navigate(['admin-panel/side']);

        },
          () => {
            this._toastrService.error('Nie udało się stworzyć nowej postaci.');
          })
    );

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
      });
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
    );

  }

  generateStoryForms(storyForm: NgForm) {
    const map = new Map();
    for (const key in storyForm.controls) {
      if (storyForm.controls.hasOwnProperty(key)) {
        key === 'name' ? this.characterWithStoryId = storyForm.value[key] : null;
        if (key !== 'name') {
          const id = +key;
          const value = !!storyForm.value[id];
          if (value && this.titles && this.titles.length > 0) {
            const titleForStory = this.titles.find(t => {
              return t.id === id;
            });
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
      this._toastrService.warning('Nie uzupełniono poprawnie formularza.');
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
              this._toastrService.error(err.error);
            }
          })
    );
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
          console.log("this.sideCharacterDetails.books: ", this.sideCharacterDetails);
          const name = this.editSideCharForm.get('name');
          const surname = this.editSideCharForm.get('surname');
          const desc = this.editSideCharForm.get('desc');
          const books = this.editSideCharForm.get('books');

          if (name) {
            name.setValue(details.sideCharacterName);
          }
          if (surname) {
            surname.setValue(details.sideCharacterSurname);
          }
          if (desc) {
            desc.setValue(details.sideCharacterDesc);
          }
          if (books) {
            if (this.sideCharacterDetails.books && this.books) {
              // const foundBook = this.sideCharacterDetails.books.find(sb => {
              //   return sb.externalId === this.books.find(b => {
              //     return b.externalId === sb.externalId;
              //   }).externalId;
              // });
              for (const key in this.books) {
                if (this.books.hasOwnProperty(key)) {
                  const element = this.books[key];
                  const foundBook = this.sideCharacterDetails.books.find(sb => {
                    return sb.externalId === element.externalId
                  });

                  // console.log("found book: ", foundBook)
                  // if (foundBook) {
                  //   this.detailsBooksIds.push(foundBook.externalId)
                  // }
                }
              }

            }
          }

        },
          err => {
            if (err && err.error) {
              this._toastrService.error(err.error);
            }
          })
    );
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
    objToSend.books = this.detailsBooksIds;
    console.log(objToSend.books);
    this.loading = true;

    return;

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
      const extensionReg = /(jpg|jpeg|gif|png)/i;
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
          this._router.navigate(['admin-panel/main']);
        },
          () => {
            this._toastrService.error('Nie udało się zmienić profilowego.');
          })
    );
  }

  getBooks() {
    this.subscriptions$.add(
      this._sideCharacterService
        .getBooks()
        .subscribe(books => {
          this.books = books;
        })
    );
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
        this.getBooks();
        break;

      case 'new-chars':
        this.loading = false;
        this.getBooks();
        break;

      case 'new-character':
      case 'edit-side-pic':
        this.loading = false;
        break;
    }
  }
}
