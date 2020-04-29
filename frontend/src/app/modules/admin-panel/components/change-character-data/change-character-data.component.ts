import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base.component';
import { CharacterItem } from 'src/app/modules/characters/models/character-item.model';
import { IImageForMain } from 'src/app/modules/characters/models/image-for-main.model';
import { Quote } from 'src/app/modules/characters/models/quote.model';
import { RelationshipType } from '../../enums/relationship-type.enum';
import { EditImageName } from '../../models/edit-image-name.model';
import { EditQuote } from '../../models/edit-quote.model';
import { EditRelationship } from '../../models/edit-relationship.model';
import { IProfilePic } from '../../models/profile-pic.model';
import { IRelationRequest } from '../../models/relation-request.model';
import { RelationshipsForCharacter } from '../../models/relationships-for-char.model';
import { CharactersService } from './../../../../core/service/characters.service';
import { NewQuote } from './../../models/new-quote.model';

type changeOptions = 'delete-character' | 'edit-images'
  | 'new-chars' | 'quotes' | 'relationships' | 'edit-relationship' | 'character-stories';
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

  quotes: Quote[] | null = null;
  isQuoteFormShown = false;

  selectedCharId: number;

  profilePicForMain: IProfilePic | null = null;
  imagesListForMain: IImageForMain[] | null = null;


  newProfilePicForm = new FormGroup({
    profilePic: new FormControl()
  });

  newQuoteForm = new FormGroup({
    quote: new FormControl('', Validators.required),
    context: new FormControl('', Validators.required)
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

      case 'edit-images':
        this.getCharacterImages();
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

      case 'character-stories':
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

  insertDeleteInfo() {
    this._toastrService.warning('Aby usunąć wybrany element, naciśnij dwa razy.');
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
      selectEl.style.width = '100%';
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
      this._toastrService.error('Nie uzupełniono typu relacji.');
      return;
    }

    const request: IRelationRequest = {
      charId: firstChar.id,
      relCharId: secondChar.id,
      relation: RelationshipType[relation],
      reverseRelation: RelationshipType[reverseRelation]
    };

    console.log(request);
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
    );
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
    );
  }

  editRelation(relatedCharacterId: number, targetValue: number, isReverse: boolean) {
    this.loading = true;

    const objToSend = new EditRelationship();
    objToSend.characterId = this.selectedCharId;
    objToSend.relatedCharacterId = relatedCharacterId;
    if (isReverse) {
      objToSend.reversedRelationType = RelationshipType[targetValue]
      objToSend.relationType = null;

    } else {
      objToSend.relationType = RelationshipType[targetValue];
      objToSend.reversedRelationType = null;

    }
    console.log(objToSend)

    this.subscriptions$.add(
      this._characterService
        .patchRelationship(objToSend)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(_ => {
          this._toastrService.success('Udało się edytować relację.');
          this.getRelationshipsForCharacter();
        }, err => {
          this._toastrService.error('Nie udało się edytować relacji.');
        })
    )
  }

  deleteRelation(relatedCharacterId: number) {
    console.log(relatedCharacterId);
    this.loading = true;
    this.subscriptions$.add(
      this._characterService
        .deleteRelationship(this.selectedCharId, relatedCharacterId)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe(_ => {
          this._toastrService.success('Udało się usunąć relację!');
          this.getRelationshipsForCharacter();
        }, err => {
          this._toastrService.error('Nie udało się usunąć relacji.');
        })
    );

  }

}
