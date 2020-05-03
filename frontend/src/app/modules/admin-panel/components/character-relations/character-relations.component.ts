import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/core/base.component';
import { CharactersService } from 'src/app/core/service/characters.service';
import { finalize, startWith, map } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { RelationshipType } from '../../enums/relationship-type.enum';
import { CharacterItem } from 'src/app/modules/characters/models/character-item.model';
import { RelationshipsForCharacter } from '../../models/relationships/relationships-for-char.model';
import { IRelationRequest } from '../../models/relationships/relation-request.model';
import { EditRelationship } from '../../models/relationships/edit-relationship.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-character-relations',
  templateUrl: './character-relations.component.html',
  styleUrls: ['./character-relations.component.scss'],
  host: {
    '(window:click)': 'closeAllSelects()'
  }
})

export class CharacterRelationsComponent extends BaseComponent implements OnInit {
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

  changeType: string | null;

  charList: CharacterItem[] = [];
  filteredCharacters = new Observable<CharacterItem[]>();
  filteredCharacters2 = new Observable<CharacterItem[]>();

  selectedCharacter?: CharacterItem;

  relationshipsList: RelationshipsForCharacter[] = [];

  relationForm = new FormGroup({
    firstChar: new FormControl(''),
    secondChar: new FormControl(''),
    firstCharReversed: new FormControl(''),
    secondCharReversed: new FormControl(''),
    relation: new FormControl(-1),
    reverseRelation: new FormControl(-1)
  });


  charId: number;

  type: 'new' | 'edit';

  constructor(
    private _toastrService: ToastrService,
    private _characterService: CharactersService,
    private _activatedRoute: ActivatedRoute,
  ) {
    super();

  }

  private _filterCharacters(value: string) {
    const filterValue = value.toLowerCase();

    return this.charList.filter(c => `${c.charName} ${c.charSurname}`.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
    this._activatedRoute?.parent?.queryParams
      .subscribe(queryParam => {
        this.charId = +queryParam.id;
      });

    if (this._activatedRoute?.parent?.params) {

      this.subscriptions$.add(
        this._activatedRoute.params.subscribe(param => {
          this.type = param.type;
          switch (this.type) {
            case 'new':
              this.getCharactersList();

              this.relationForm.controls['secondChar'].disable();
              this.relationForm.controls['firstCharReversed'].disable();
              break;

            case 'edit':
              this.getCharactersList();
              this.getRelationshipsForCharacter();
              break;
          }

        }))
    }

    this.relationForm
      .controls['firstChar']
      .valueChanges
      .subscribe(x => {
        this.relationForm.controls['firstCharReversed'].setValue(x);
      })

    this.relationForm
      .controls['secondCharReversed']
      .valueChanges.subscribe(x => {
        this.relationForm.controls['secondChar'].setValue(x);
      })
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

          this.filteredCharacters = this.relationForm.controls['firstChar'].valueChanges
            .pipe(
              startWith(''),
              map(character => character ? this._filterCharacters(character) : this.charList)
            );

          this.filteredCharacters2 = this.relationForm.controls['secondCharReversed'].valueChanges
            .pipe(
              startWith(''),
              map(character => character ? this._filterCharacters(character) : this.charList)
            );

          this.selectedCharacter = charList.find(x => x.id === this.charId);
        })
    );
  }

  openSelect(event: MouseEvent, forSelectList: number) {
    this.closeAllSelects();
    event.stopPropagation();

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
        .getRelationshipsForCharacter(this.charId)
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
    objToSend.characterId = this.charId;
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
        .deleteRelationship(this.charId, relatedCharacterId)
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
