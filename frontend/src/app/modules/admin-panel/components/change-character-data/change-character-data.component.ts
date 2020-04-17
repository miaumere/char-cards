import { ICharacterItem } from 'src/app/modules/characters/models/character-item.model';
import { StoryToEdit } from './../../models/story-to-edit.model';
import { NewTitle } from './../../models/new-title.model';
import { EditTitle } from './../../models/edit-title.model';
import { NewQuote } from './../../models/new-quote.model';
import { ToastrService } from 'ngx-toastr';
import { CharactersService } from './../../../../core/service/characters.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/core/base.component';
import { Quote } from 'src/app/modules/characters/models/quote.model';
import { EditQuote } from '../../models/edit-quote.model';
import { StoryToSend } from '../../models/story-to-send.model';
import { IProfilePic } from '../../models/profile-pic.model';
import { StoryForCharacter } from '../../models/story-for-character.model';
import { Title } from '../../models/title.model';
import { IImageForMain } from 'src/app/modules/characters/models/image-for-main.model';
import { EditImageName } from '../../models/edit-image-name.model';

type changeOptions = 'new-character' | 'edit-character' | 'delete-character' | 'story' | 'edit-images'
  | 'new-chars' | 'quotes' | 'story-for-char';
@Component({
  selector: 'app-change-character-data',
  templateUrl: './change-character-data.component.html',
  styleUrls: ['./change-character-data.component.scss']
})
export class ChangeCharacterDataComponent extends BaseComponent implements OnInit {
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
  })

  charList: ICharacterItem[] | null = null;

  profilePic: File | null = null;
  images: FileList | null = null;

  @ViewChild('newProfilePic') newProfilePic;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _characterService: CharactersService,
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
          if (param.name === 'edit-images' ||
            param.name === 'edit-character' || param.name === 'story-for-char' || param.name === 'quotes'
          ) {
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

      case 'quotes':
        this.getQuotes();
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
    )
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
          }))
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
}
