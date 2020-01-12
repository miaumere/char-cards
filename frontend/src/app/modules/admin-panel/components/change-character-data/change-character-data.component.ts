import { StoryToEdit } from './../../models/story-to-edit.model';
import { NewTitle } from './../../models/new-title.model';
import { EditTitle } from './../../models/edit-title.model';
import { NewQuote } from './../../models/new-quote.model';
import { SideCharactersService } from 'src/app/core/service/side-characters.service';
import { ToastrService } from 'ngx-toastr';
import { CharactersService } from './../../../../core/service/characters.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Titles } from '../../models/titles.model';
import { StoryForCharacter } from '../../models/story.model';
import { BaseComponent } from 'src/app/core/base.component';
import { SideCharacterDetails } from '../../models/side-characters-details.model';
import { EditSideCharacterDetails } from '../../models/edit-side-character-details.model';
import { Book } from '../../models/book.model';
import { Quote } from 'src/app/modules/characters/models/quote.model';
import { EditQuote } from '../../models/edit-quote.model';
import { StoryToSend } from '../../models/story-to-send.model';
import { ProfilePic } from '../../models/profile-pic.model';
import { ImageForMain } from 'src/app/modules/characters/models/character.model';
import { validateImage } from 'src/app/shared/functions/validate-image.function';

type changeOptions = 'new-character' | 'edit-character' | 'delete-character' | 'story' | 'edit-images'
  | 'new-chars' | 'edit-side' | 'edit-side-pic' | 'quotes' | 'story-for-char';
@Component({
  selector: 'app-change-character-data',
  templateUrl: './change-character-data.component.html',
  styleUrls: ['./change-character-data.component.scss']
})
export class ChangeCharacterDataComponent extends BaseComponent implements OnInit {
  loading = true;

  formsArr = [];

  changeType: string | null;

  titles: Titles[] | null = null;

  books: Book[];

  quotes: Quote[];
  isQuoteFormShown = false;

  selectedCharId: number;
  sideCharacterDetails: SideCharacterDetails;
  detailsBooksIds: number[] = [];

  profilePicForSide: ProfilePic;
  profilePicForMain: ProfilePic;
  imagesListForMain: ImageForMain[];

  stories: StoryForCharacter[];

  newSideCharForm = new FormGroup({
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
    ]),
    books: new FormArray([]),
    profilePic: new FormControl()
  });

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
    profilePic: new FormControl()
  });


  newQuoteForm = new FormGroup({
    quote: new FormControl('', Validators.required),
    context: new FormControl('', Validators.required)
  });

  newTitleForm = new FormGroup({
    title: new FormControl('', Validators.required),
  })

  profilePic: File | null = null;
  images: FileList | null = null;

  @ViewChild('sideCharProfilePic') sideCharProfilePic;
  @ViewChild('newProfilePic') newProfilePic;


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
          if (param.name === 'edit-side' || param.name === 'edit-side-pic' || param.name === 'edit-images' ||
            param.name === 'edit-character' || param.name === 'story-for-char' || param.name === 'quotes') {
            this._route.queryParams.subscribe(queryParam => {
              if (queryParam.id) {
                this.selectedCharId = +queryParam.id;
              }
            });
          }
          this.displayInfo(param.name);
        })
      );
    }


  }

  displayInfo(changeOption: changeOptions) {
    switch (changeOption) {
      case 'story-for-char':
        this.getStoriesForCharacter();
        break;

      case 'edit-images':
        this.getCharacterImages();
        break;

      case 'story':
        this.getStoryTitles();
        break;

      case 'edit-side':
        this.getSideCharacterDetails();
        this.getBooks();
        break;

      case 'new-chars':
        this.getBooks();
        break;

      case 'quotes':
        this.getQuotes();
        break;

      case 'edit-side-pic':
        this.getSideCharacterImages();
        break;

      case 'edit-character':
      case 'new-character':
        this.loading = false;
        break;
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

  getSideCharacterImages() {
    this.subscriptions$.add(
      this._sideCharacterService
        .getSideCharacter(this.selectedCharId)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(sideCharacter => {
          this.profilePicForSide = sideCharacter[0]?.profilePic;
        })
    )
  }

  getCharacterImages() {
    this.subscriptions$.add(
      this._characterService
        .getCharacter(this.selectedCharId)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe(character => {
          this.profilePicForMain = character[0]?.profilePic;
        })
    )
    this.subscriptions$.add(
      this._characterService
        .getCharacterById(this.selectedCharId)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe(character => {
          this.imagesListForMain = character.imagesList;
        }
        )
    )

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

  deleteTitle(id: number) {
    this.subscriptions$.add(
      this._characterService
        .deleteTitle(id)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(_ => {
          this._toastrService.success('Udało się usunąć tytuł!');
          this.getStoryTitles();
        },
          err => {
            this._toastrService.error(err?.error);
          })
    )
  }

  insertDeleteInfo() {
    this._toastrService.warning('Aby usunąć wybrany element, naciśnij dwa razy.');
  }

  createNewTitle() {
    this.loading = true;

    const value = this.newTitleForm.controls['title']?.value;
    const objToSend = new NewTitle();
    objToSend.title = value;

    this._characterService.postNewTitle(objToSend)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      ).subscribe(_ => {
        this._toastrService.success('Udało się dodać nowy tytuł!');
        this.getStoryTitles();
      }, err => {
        this._toastrService.error(err?.error);
      })
  }

  changeSequence(titleIndex: number, action: 'UP' | 'DOWN') {
    if (this.titles && this.titles?.length > 0) {
      const titleFromIndex = this.titles[titleIndex];
      switch (action) {
        case 'UP':
          // console.log('UP: ', titleIndex);

          this.titles[titleIndex] = this.titles[titleIndex - 1];
          this.titles[titleIndex - 1] = titleFromIndex;

          console.log(this.titles);
          break;
        case 'DOWN':
          // console.log('DOWN: ', titleIndex)

          this.titles[titleIndex] = this.titles[titleIndex + 1];
          this.titles[titleIndex + 1] = titleFromIndex;

          // console.log(this.titles);
          break;
      }

      this.subscriptions$.add(
        this._characterService
          .patchTitlesSequence(this.titles)
          .pipe(
            finalize(() => {
              this.loading = false;
            })
          ).subscribe(_ => {
            console.log('sekwencja zostala zapisana.')
          })
      )

    }
  }

  getStoriesForCharacter() {
    this.subscriptions$.add(
      this._characterService
        .getStoriesForCharacter(this.selectedCharId)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe(stories => {
          this.stories = stories;
        }, err => {
          this._toastrService.error(err?.error);
        })
    )
  }

  createStory(story: string, titleId: number) {
    if (story.length < 100) {
      this._toastrService.warning('Historia jest za krótka! Wymagane jest min. 100 znaków.');
    } else {
      this.loading = true;

      const storyToSend = new StoryToSend();

      storyToSend.characterId = this.selectedCharId;
      storyToSend.titleId = titleId;
      storyToSend.story = story;

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
              this.getStoriesForCharacter();
            },
            err => {
              if (err.error) {
                this._toastrService.error(err.error);
              }
            }));
    }
  }

  editStory(story: string, storyId: number) {
    if (story.length < 100) {
      this._toastrService.warning('Historia jest za krótka! Wymagane jest min. 100 znaków.');
    } else {
      this.loading = true;

      const storyToSend = new StoryToEdit();

      storyToSend.storyId = storyId;
      storyToSend.story = story;

      this._characterService
        .patchStory(storyToSend)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe(_ => {
          this._toastrService.success('Udało się zmienić treść historii!');
          this.getStoriesForCharacter();
        }, err => {
          this._toastrService.error(err?.error);
        })
    }
  }

  deleteStory(storyId: number) {
    this.subscriptions$.add(
      this._characterService
        .deleteStory(storyId)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(_ => {
          this._toastrService
            .success('Udało się usunąć historię dla wybranego tytułu! Skasowany tytuł i historia nie pojawią się w karcie postaci.');
          this.getStoriesForCharacter();
        },
          err => {
            this._toastrService.error(err?.error);
          })
    )
  }

  createNewQuote() {
    this.loading = true;
    const formValues: { [key: string]: string } = this.newQuoteForm.value;
    const objToSend = new NewQuote();
    objToSend.characterId = this.selectedCharId;

    for (const [key, value] of Object.entries(formValues)) {
      objToSend[key] = value;
    }

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
        });
  }

  getSideCharacterDetails() {
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
          const books = this.editSideCharForm.get('books');

          this.editSideCharForm.get('name')?.setValue(details.sideCharacterName);
          this.editSideCharForm.get('surname')?.setValue(details.sideCharacterSurname);
          this.editSideCharForm.get('desc')?.setValue(details.sideCharacterDesc);

          if (books) {
            const booksArray: number[] = [];
            setTimeout(() => {
              for (const key in this.books) {
                if (this.books.hasOwnProperty(key)) {
                  const element = this.books[key];

                  const foundBook = this.sideCharacterDetails.books.find(sb => {
                    return sb.externalId === element.externalId;
                  });

                  if (foundBook) {
                    booksArray.push(foundBook.externalId);
                  }

                }
              }
              this.detailsBooksIds = booksArray;
            }, 0);



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
    this.loading = true;
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
    objToSend.booksIds = this.detailsBooksIds;
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
          this.getSideCharacterDetails();
        }, err => {
          if (err && err.error) {
            this._toastrService.error(err.error);
          }
        }
        )
    );
  }

  setNewProfilePic() {
    this.loading = true;

    const fileToUpload = this.newProfilePic.nativeElement.files[0];

    validateImage(fileToUpload, this._toastrService);

    const formData = new FormData();
    formData.set('externalId', '' + this.selectedCharId);
    formData.append('profilePic', fileToUpload);
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
    );
  }

  getBooks() {
    this.subscriptions$.add(
      this._sideCharacterService
        .getBooks()
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(books => {
          this.books = books;
        })
    );
  }

  getQuotes() {
    this.loading = true;

    this.subscriptions$.add(
      this._characterService
        .getQuotesForCharacter(this.selectedCharId)
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

  editTitle(titleId: number, titleElement: HTMLElement, titleContainer: HTMLElement) {
    if (!titleElement.isContentEditable) {
      titleElement.setAttribute('contentEditable', 'true');
      titleContainer.classList.add('titles-to-edit--editable');

      this._toastrService.info('Aby zapisać zmianę, naciśnij jeszcze raz na ikonkę edycji.');
    } else {
      if (titleElement.textContent) {
        this.loading = true;
        const objToSend = new EditTitle();
        objToSend.id = titleId;
        objToSend.title = titleElement.textContent;

        titleElement.removeAttribute('contentEditable');
        titleContainer.classList.remove('titles-to-edit--editable');

        this.subscriptions$.add(
          this._characterService
            .patchTitle(objToSend)
            .pipe(
              finalize(() => {
                this.loading = false;
              })
            ).subscribe(_ => {
              this._toastrService.success('Udało się zmienić tytuł!');
              this.getStoryTitles();
            }, err => {
              this._toastrService.error(err?.error);
            })
        )
      } else {
        this._toastrService.warning('Tytuł nie może być pusty!');
      }
    }

  }

  deleteCharacterImage(imageId: number) {
    this.loading = true;

    this.subscriptions$.add(
      this._characterService
        .deleteImage(imageId)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe(_ => {
          this._toastrService.success('Udało się usunąć zdjęcie!');
          this.getCharacterImages();
        }, err => {
          this._toastrService.error(err?.error);
        })
    )

  }

  handleFileInput(files: FileList, multiple: boolean) {
    multiple ? this.images = files : this.profilePic = files.item(0);
  }

  setNewImages() {
    this.loading = true;

    const formData = new FormData();

    if (this.profilePic) {
      formData.append('profilePic', this.profilePic);
    }
    if (this.images) {
      for (let i = 0; i < this.images.length; i++) {
        formData.append('image' + i, this.images[i]);
      }
    }

    this.subscriptions$.add(
      this._characterService
        .postEditImages(formData, this.selectedCharId)
        .subscribe(_ => {
          this._toastrService.success('Udało się zmienić zdjęcia dla postaci!');
          this.getCharacterImages();
        },
          err => {
            if (err && err.error) {
              this._toastrService.error(err.error);
            }
          })
    );
  }

}
