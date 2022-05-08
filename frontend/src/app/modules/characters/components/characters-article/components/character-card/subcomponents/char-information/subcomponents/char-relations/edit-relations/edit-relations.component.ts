import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base.component';
import { CharactersService } from 'src/app/core/service/characters.service';
import { CharacterItem } from 'src/app/modules/characters/models/character-item.model';
import {
    IRelation,
    IRelationForCharacter,
    IRelationRequest,
    IRelationTreeDto,
} from 'src/app/modules/characters/models/relations/relation-tree-dto.model';
import {
    RelationType,
    RelationTypeString,
} from 'src/app/modules/characters/models/relations/relation-type.enum';
import { IRelationship } from 'src/app/modules/characters/models/relationship.model';
import { colorsForRelations } from '../relation-tree/colors-for-relations.const';

@Component({
    selector: 'app-edit-relations [charId]',
    templateUrl: './edit-relations.component.html',
    styleUrls: ['./edit-relations.component.scss'],
})
export class EditRelationsComponent extends BaseComponent implements OnInit {
    readonly RelationType = RelationType;
    @Input('color') themeColor1: string = '';
    @Input() charId: number = 0;

    filteredCharacters = new Observable<CharacterItem[]>();
    charList: CharacterItem[] = [];

    relationsForCharacter: IRelationForCharacter[] = [];

    expandRelations = false;

    formHasChanged = false;

    relationsFormGroup = new FormGroup({});

    newCharacterForm = new FormGroup({
        characterToAdd: new FormControl(null),
    });

    readonly colorsForRelations = colorsForRelations;

    get relatedPeopleIds(): number[] {
        return this.relationsForCharacter.map((x) => x.person.id);
    }

    constructor(
        private _characterService: CharactersService,
        private _toastrService: ToastrService,
        private _translate: TranslateService
    ) {
        super();
    }

    ngOnInit(): void {
        this.getCharacterRelations();
        this.getCharactersList();
    }

    getRelationWithPerson(personId: number) {
        return (
            (
                this.relationsFormGroup.controls['' + personId] as
                    | FormArray
                    | undefined
            )?.controls ?? []
        );
    }

    getCharacterRelations() {
        this.subscriptions$.add(
            this._characterService
                .getRelations(this.charId)
                .subscribe((relations) => {
                    if (relations.length > 0) {
                        for (const relation of relations) {
                            const relationsArray = [];

                            const relationsFormGroup = new FormGroup({
                                relations: new FormArray([]),
                            });

                            const typedRelationFormArray =
                                relationsFormGroup.get(
                                    'relations'
                                ) as FormArray;

                            relationsArray.push(relationsFormGroup);

                            this.relationsFormGroup.setControl(
                                '' + relation.person.id,
                                new FormArray(relationsArray)
                            );

                            for (const rel of relation.relations) {
                                const newInputGroup = new FormGroup({
                                    id: new FormControl(rel.id),
                                    type: new FormControl(
                                        rel.type,
                                        Validators.required
                                    ),
                                    relationDateStart: new FormControl(
                                        rel.relationDateStart
                                    ),
                                    relationDateEnd: new FormControl(
                                        rel.relationDateEnd
                                    ),
                                });
                                typedRelationFormArray.push(newInputGroup);
                            }
                        }
                    }
                    this.relationsForCharacter = relations;
                })
        );
    }

    getColorForRelation(relation: RelationTypeString) {
        return this.colorsForRelations.find(
            (rel) => rel.relationType === relation
        )?.fillColor;
    }

    addNewRelationWithCharacter(personId: number) {
        const controls = this.getFormForPersonId(personId).controls;

        const newRelation = new FormGroup({
            id: new FormControl(null),
            type: new FormControl(null, Validators.required),
            relationDateStart: new FormControl(null),
            relationDateEnd: new FormControl(null),
        });

        controls?.push(newRelation);
        this.formHasChanged = true;

        this.getFormForPersonId(personId).markAllAsTouched();
    }

    getFormForPersonId(personId: number): FormArray {
        return (
            (
                (
                    this.relationsFormGroup.get('' + personId) as
                        | FormArray
                        | undefined
                )?.controls[0] as FormGroup | undefined
            )?.controls as { relations: FormArray } | undefined
        )?.relations as FormArray;
    }
    canCreateNewRelation(personId: number) {
        return this.getFormForPersonId(personId).valid;
    }

    saveRelations() {
        this.relationsFormGroup.markAllAsTouched();
        if (this.relationsFormGroup.invalid) {
            return;
        }

        const request: IRelationRequest[] = [];

        for (const relationForCharacter of this.relationsForCharacter) {
            const personId = relationForCharacter.person.id;
            const relations: IRelation[] = [];
            for (const relation of this.relationsFormGroup.getRawValue()[
                personId
            ][0].relations) {
                const relationToAdd = relation;
                relations.push(relationToAdd);
            }
            const requestToAdd: IRelationRequest = {
                personId,
                relations,
            };
            request.push(requestToAdd);
        }

        this.subscriptions$.add(
            this._characterService
                .upsertRelations(request, this.charId)
                .subscribe(
                    (_) => {
                        this._toastrService.success(
                            this._translate.instant(
                                'TOASTR_MESSAGE.SAVE_SUCCESS'
                            )
                        );
                        // this.quotesChangedEvent.emit();
                        this.relationsFormGroup.reset();
                    },
                    (err) => {
                        this._toastrService.error(
                            this._translate.instant('TOASTR_MESSAGE.ERROR')
                        );
                    }
                )
        );
    }

    insertDeleteInfo() {
        this._toastrService.warning(
            this._translate.instant('TOASTR_MESSAGE.DELETE_INFO')
        );
    }

    deleteRelation(formGroup: FormGroup, personId: number) {
        this.formHasChanged = true;
        this.getFormForPersonId(personId).controls = this.getFormForPersonId(
            personId
        ).controls.filter((x) => x !== formGroup);
    }

    deletePerson(personId: number) {
        this.relationsForCharacter = this.relationsForCharacter.filter(
            (rel) => rel.person.id !== personId
        );
        this.relationsFormGroup.removeControl('' + personId);
        this.formHasChanged = true;
    }

    getCharactersList() {
        this.subscriptions$.add(
            this._characterService.getCharacters().subscribe((charList) => {
                this.charList = (charList as CharacterItem[]).filter(
                    (x) => x.id !== this.charId
                );
                this.filteredCharacters = this.newCharacterForm
                    .get('characterToAdd')
                    ?.valueChanges.pipe(
                        startWith(''),
                        map((character) =>
                            character
                                ? this._filterCharacters(character)
                                : this.charList
                        )
                    ) as Observable<CharacterItem[]>;
            })
        );
    }

    createRelationWithCharacter(event: MatAutocompleteSelectedEvent) {
        const characterItem = event.option.value as CharacterItem;

        const relationToAdd: IRelationForCharacter = {
            person: {
                id: characterItem.id,
                fullName: characterItem.fullName,
                imageMimeData: characterItem.profilePic as string,
            },
            relations: [
                {
                    id: null,
                    type: RelationType.Crush,
                    relationDateStart: null,
                    relationDateEnd: null,
                },
            ],
        };
        this.relationsForCharacter.push(relationToAdd);

        const relationsArray: any = [];

        const relationsFormGroup = new FormGroup({
            relations: new FormArray([]),
        });
        relationsArray.push(relationsFormGroup);

        const typedRelationFormArray = relationsFormGroup.get(
            'relations'
        ) as FormArray;

        this.relationsFormGroup.setControl(
            '' + characterItem.id,
            new FormArray(relationsArray)
        );

        const newInputGroup = new FormGroup({
            id: new FormControl(null),
            type: new FormControl(
                RelationType[RelationType.Crush],
                Validators.required
            ),
            relationDateStart: new FormControl(null),
            relationDateEnd: new FormControl(null),
        });

        typedRelationFormArray.push(newInputGroup);

        this.newCharacterForm.reset();
    }

    private _filterCharacters(value: CharacterItem) {
        const filterValue = value.fullName.toLowerCase();
        return this.charList.filter(
            (c) =>
                `${c.charName} ${c.charSurname}`
                    .toLowerCase()
                    .indexOf(filterValue) === 0
        );
    }
}
