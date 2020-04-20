import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base.component';
import { CharacterItem, ICharacterItem } from 'src/app/modules/characters/models/character-item.model';
import { IImageForMain } from 'src/app/modules/characters/models/image-for-main.model';
import { Quote } from 'src/app/modules/characters/models/quote.model';
import { RelationshipType } from '../../enums/relationship-type.enum';
import { EditImageName } from '../../models/edit-image-name.model';
import { EditQuote } from '../../models/edit-quote.model';
import { IProfilePic } from '../../models/profile-pic.model';
import { StoryForCharacter } from '../../models/story-for-character.model';
import { StoryToSend } from '../../models/story-to-send.model';
import { Title } from '../../models/title.model';
import { CharactersService } from './../../../../core/service/characters.service';
import { EditTitle } from './../../models/edit-title.model';
import { NewQuote } from './../../models/new-quote.model';
import { NewTitle } from './../../models/new-title.model';
import { StoryToEdit } from './../../models/story-to-edit.model';
import { IRelationRequest } from '../../models/relation-request.model';
import { RelationshipsForCharacter } from '../../models/relationships-for-char.model';
import { ICharacterForListItem } from 'src/app/modules/characters/models/character-for-list-item.model';

type changeOptions = 'new-character' | 'edit-character' | 'delete-character' | 'story' | 'edit-images'
  | 'new-chars' | 'quotes' | 'story-for-char' | 'relationships' | 'edit-relationship';
@Component({
  selector: 'app-change-character-data',
  templateUrl: './change-character-data.component.html',
  styleUrls: ['./change-character-data.component.scss'],
  host: {
    '(window:click)': 'closeAllSelects()'
  }
})
export class ChangeCharacterDataComponent extends BaseComponent implements OnInit {

  readonly RelationshipType = RelationshipType;

  characterListOne: HTMLSelectElement | null = null;
  characterListTwo: HTMLSelectElement | null = null;

  @ViewChild('characterListOne')
  set setCharacterListOne(v: any) {
    setTimeout(() => {
      this.characterListOne = v?.nativeElement;
    }, 0);
  }
  @ViewChild('characterListTwo')
  set setCharacterListTwo(v: any) {
    setTimeout(() => {
      this.characterListTwo = v?.nativeElement;
    }, 0);
  }


  loading = true;

  formsArr = [];

  changeType: string | null;

  titles: Title[] | null = null;

  quotes: Quote[] | null = null;
  isQuoteFormShown = false;

  selectedCharId: number;

  profilePicForMain: IProfilePic | null = null;
  imagesListForMain: IImageForMain[] | null = null;

  stories: StoryForCharacter[] | null = null;

  newProfilePicForm = new FormGroup({
    profilePic: new FormControl()
  });

  newQuoteForm = new FormGroup({
    quote: new FormControl('', Validators.required),
    context: new FormControl('', Validators.required)
  });

  newTitleForm = new FormGroup({
    title: new FormControl('', Validators.required),
  });

  charList: CharacterItem[] = [];
  filteredCharList: CharacterItem[] = [];

  selectedCharacter?: CharacterItem;

  relationshipsList: RelationshipsForCharacter[] = [];

  profilePic: File | null = null;
  images: FileList | null = null;

  @ViewChild('newProfilePic') newProfilePic;

  relationForm = new FormGroup({
    firstChar: new FormControl(''),
    secondChar: new FormControl(''),
    relation: new FormControl(-1),
    reverseRelation: new FormControl(-1)
  });

  constructor(
    private _route: ActivatedRoute,
    private _characterService: CharactersService,
    private _toastrService: ToastrService
  ) {
    super();
  }

  ngOnInit() {
    this.setChangeData();

    this.subscriptions$.add(
      this.relationForm.get('firstChar')?.valueChanges.subscribe((value: string) => {
        this._setFilteredList(value);
      })
    );
    this.subscriptions$.add(
      this.relationForm.get('secondChar')?.valueChanges.subscribe((value: string) => {
        this._setFilteredList(value);
      })
    );
  }

  private _setFilteredList(value: string) {
    this.filteredCharList = this.charList.filter(c => {
      const charName = `${c.charName} ${c.charSurname}`.toLowerCase();
      return charName.indexOf(value.toLowerCase()) !== -1;
    });
  }

  setChangeData() {
    if (this._route && this._route.parent && this._route.parent.params) {
      this.subscriptions$.add(
        this._route.params.subscribe(param => {
          this.changeType = param.name;

          this._route.queryParams.subscribe(queryParam => {
            if (queryParam.id) {
              this.selectedCharId = +queryParam.id;
            }
          });

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

      case 'quotes':
        this.getQuotes();
        break;

      case 'relationships':
        this.getCharactersList();
        break;

      case 'edit-relationship':
        this.getCharactersList();
        this.getRelationshipsForCharacter();
        break;

      case 'edit-character':
      case 'new-character':
        this.loading = false;
        break;
    }
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
    );
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
    );
  }

  insertDeleteInfo() {
    this._toastrService.warning('Aby usunąć wybrany element, naciśnij dwa razy.');
  }

  createNewTitle() {
    this.loading = true;

    const value = this.newTitleForm.controls['title']?.value;
    const objToSend = new NewTitle();
    objToSend.title = value;

    this.subscriptions$.add(
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
    );
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
            // console.log('sekwencja zostala zapisana.')
          })
      );

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
    );
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
        });
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
    );
  }

  createNewQuote() {
    this.loading = true;
    const formValues: { [key: string]: string } = this.newQuoteForm.value;
    const objToSend = new NewQuote();
    objToSend.characterId = this.selectedCharId;

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
        );
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
    );

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
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(_ => {
          this._toastrService.success('Udało się zmienić zdjęcia dla postaci!');
          this.getCharacterImages();
        },
          err => {
            if (err?.error) {
              this._toastrService.error(err.error);
            }
          })
    );
  }

  changeImageName(imageId: number, imageElement: HTMLElement) {

    if (!imageElement.isContentEditable) {
      imageElement.setAttribute('contentEditable', 'true');
      imageElement.classList.add('profile-pic-name--editable');

      this._toastrService.info('Aby zapisać zmianę, naciśnij jeszcze raz na ikonkę edycji.');
    } else {
      if (imageElement.textContent) {
        const objToSend = new EditImageName();
        objToSend.id = imageId;
        objToSend.name = imageElement.textContent;
        this.subscriptions$.add(
          this._characterService
            .patchImageName(objToSend)
            .pipe(
              finalize(() => {
                this.loading = false;
              })
            ).subscribe(_ => {
              this._toastrService.success('Udało się zmienić nazwę zdjęcia!');
              this.getCharacterImages();
            }, err => {
              this._toastrService.error(err?.error);
            })
        );
      } else {
        this._toastrService.warning('Nazwa obrazka nie może być pusta.');
      }
    }
  }

  getCharactersList() {
    this.loading = true;

    this.subscriptions$.add(
      this._characterService
        .getCharacters()
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(charList => {
          this.charList = charList;
          this.filteredCharList = charList;

          this.selectedCharacter = charList.find(x => x.id === this.selectedCharId);

        })
    );
  }

  openSelect(event: MouseEvent, forSelectList: number) {
    this.closeAllSelects();
    event.stopPropagation();
    const target = event.target as HTMLInputElement;

    this._setFilteredList(target.value);

    switch (forSelectList) {
      case 1:
        this._openSelect(this.characterListOne);

        break;
      case 2:
        this._openSelect(this.characterListTwo);

        break;
    }
  }

  private _openSelect(selectEl: HTMLSelectElement | undefined | null) {
    if (!!selectEl) {
      selectEl.style.display = 'block';
      selectEl.style.width = '100%'
      selectEl.size = 5;
    }
  }

  onItemSelect(e: Event, formControlName: string) {
    const eventTarget = e.target as HTMLSelectElement;
    eventTarget.style.display = 'none';
    this.relationForm.get(formControlName)?.setValue(eventTarget.value);
  }

  closeAllSelects() {
    if (!!this.characterListOne) {
      this.characterListOne.style.display = 'none';
    }
    if (!!this.characterListTwo) {
      this.characterListTwo.style.display = 'none';
    }
  }

  createNewRelation() {
    this.loading = true;

    const firstChar = this.charList.find(c => c.fullName === this.relationForm.get('firstChar')?.value);
    const secondChar = this.charList.find(c => c.fullName === this.relationForm.get('secondChar')?.value);
    const relation = this.relationForm.get('relation')?.value;
    const reverseRelation = this.relationForm.get('reverseRelation')?.value;

    if (!firstChar || !secondChar) {
      this._toastrService.error('Błąd walidacji. Co najmniej jedna z podanych postaci nie istnieje.');
      return;
    } else if (!relation || !reverseRelation) {
      this._toastrService.error('Nie uzupełniono typu relacji.')
      return;
    }

    const request: IRelationRequest = {
      charId: firstChar.id,
      relCharId: secondChar.id,
      relation: RelationshipType[relation],
      reverseRelation: RelationshipType[reverseRelation]
    };

    console.log(request)
    this.subscriptions$.add(
      this._characterService.postNewRelationship(
        request
      ).pipe(
        finalize(() => {
          this.loading = false;
        })
      ).subscribe(_ => {
        this._toastrService.success('Udało się dodać nową relację.');
        this.relationForm.reset();
      }, error => {
        this._toastrService.error(error.error);
      })
    )
    console.warn(request);
  }

  getRelationshipsForCharacter() {
    this.loading = true;

    this.subscriptions$.add(
      this._characterService
        .getRelationshipsForCharacter(this.selectedCharId)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(relations => {
          this.relationshipsList = relations;
          console.log(this.relationshipsList);
        })
    )
  }

  editRelation() {

  }


}
