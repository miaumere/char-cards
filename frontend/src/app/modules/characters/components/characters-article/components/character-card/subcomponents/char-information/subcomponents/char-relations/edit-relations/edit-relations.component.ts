import { CharType } from 'src/app/modules/characters/enums/char-type.enum';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormArray } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base.component';
import { CharactersService } from 'src/app/core/service/characters.service';
import { CharacterItem } from 'src/app/modules/characters/models/character-item.model';
import {
    IRelationForCharacter,
    IRelationRequest,
} from 'src/app/modules/characters/models/relations/relation-tree-dto.model';
import {
    RelationType,
    RelationTypeString,
} from 'src/app/modules/characters/models/relations/relation-type.enum';
import { insertDeleteInfo } from 'src/app/modules/shared/functions/insert-delete.info';
import { colorsForRelations } from '../relation-tree/colors-for-relations.const';

@Component({
    selector: 'app-edit-relations [charId] [charFullName]',
    templateUrl: './edit-relations.component.html',
    styleUrls: ['./edit-relations.component.scss'],
})
export class EditRelationsComponent extends BaseComponent implements OnInit {
    readonly RelationType = RelationType;

    @Input('color') themeColor1: string = '';
    @Input() charId: number = 0;
    @Input() charFullName: string = '';

    @Output() relationsChangedEvent = new EventEmitter<true>();

    filteredCharList: CharacterItem[] = [];
    charList: CharacterItem[] = [];

    relationsForCharacter: IRelationForCharacter[] = [];

    expandRelations = false;

    formHasChanged = false;

    relationsFormGroup = new UntypedFormGroup({});

    newCharacterForm = new UntypedFormGroup({
        characterToAdd: new UntypedFormControl(null),
    });

    readonly colorsForRelations = colorsForRelations;

    insertDeleteInfo = () =>
        insertDeleteInfo(this._toastrService, this._translate);

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

        this.newCharacterForm
            .get('characterToAdd')
            ?.valueChanges.subscribe((value) => {
                this._filterCharacters(value);
            });
    }

    getRelationWithPerson(personId: number) {
        return (
            (
                this.relationsFormGroup.controls['' + personId] as
                    | UntypedFormArray
                    | undefined
            )?.controls ?? []
        );
    }

    private _filterCharacters(value: string) {
        if (!value) {
            this.filteredCharList = this.charList;
            return;
        }
        const regex = new RegExp(value, 'gi');

        const filteredChars = this.filteredCharList.filter((c) => {
            if (c.pseudonym) {
                return c.fullName.match(regex) || c.pseudonym.match(regex);
            }
            return c.fullName.match(regex);
        });

        this.filteredCharList = filteredChars;
    }

    getCharacterRelations() {
        this.subscriptions$.add(
            this._characterService
                .getRelations(this.charId)
                .subscribe((relations) => {
                    if (relations.length > 0) {
                        for (const relation of relations) {
                            const relationsArray = [];

                            const relationsFormGroup = new UntypedFormGroup({
                                relations: new UntypedFormArray([]),
                            });

                            const typedRelationFormArray =
                                relationsFormGroup.get(
                                    'relations'
                                ) as UntypedFormArray;

                            relationsArray.push(relationsFormGroup);

                            this.relationsFormGroup.setControl(
                                '' + relation.person.id,
                                new UntypedFormArray(relationsArray)
                            );
                            for (const rel of relation.relations) {
                                const newInputGroup = new UntypedFormGroup({
                                    id: new UntypedFormControl(rel.id),
                                    type: new UntypedFormControl(
                                        rel.type,
                                        Validators.required
                                    ),
                                    relationDateStart: new UntypedFormControl(
                                        rel.relationDateStart
                                            ? new Date(rel.relationDateStart)
                                            : null
                                    ),
                                    relationDateEnd: new UntypedFormControl(
                                        rel.relationDateEnd
                                            ? new Date(rel.relationDateEnd)
                                            : null
                                    ),
                                    arrowFromSource: new UntypedFormControl(
                                        !!rel.arrowFromSource
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

        const newRelation = new UntypedFormGroup({
            id: new UntypedFormControl(null),
            type: new UntypedFormControl(null, Validators.required),
            relationDateStart: new UntypedFormControl(null),
            relationDateEnd: new UntypedFormControl(null),
            arrowFromSource: new UntypedFormControl(true),
        });

        controls?.push(newRelation);
        this.formHasChanged = true;

        this.getFormForPersonId(personId).markAllAsTouched();
    }

    getFormForPersonId(personId: number): UntypedFormArray {
        return (
            (
                (
                    this.relationsFormGroup.get('' + personId) as
                        | UntypedFormArray
                        | undefined
                )?.controls[0] as UntypedFormGroup | undefined
            )?.controls as { relations: UntypedFormArray } | undefined
        )?.relations as UntypedFormArray;
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

            for (const relation of this.relationsFormGroup.getRawValue()[
                personId
            ][0].relations) {
                const requestToAdd: IRelationRequest = {
                    id: relation.id,
                    relationDateStart: (relation.relationDateStart =
                        relation.relationDateStart
                            ? new Date(relation.relationDateStart).getTime()
                            : null),
                    relationDateEnd: (relation.relationDateEnd =
                        relation.relationDateEnd
                            ? new Date(relation.relationDateEnd).getTime()
                            : null),
                    sourceCharacterId: relation.arrowFromSource
                        ? this.charId
                        : personId,
                    targetCharacterId: relation.arrowFromSource
                        ? personId
                        : this.charId,
                    type: relation.type,
                };

                request.push(requestToAdd);
            }
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
                        this.relationsFormGroup.reset();
                        this.relationsChangedEvent.emit(true);
                        this.getCharacterRelations();
                    },
                    (err) => {
                        this._toastrService.error(
                            this._translate.instant('TOASTR_MESSAGE.ERROR')
                        );
                    }
                )
        );
    }

    deleteRelation(formGroup: UntypedFormGroup, personId: number) {
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
                const listWithoutMainCharacter = (
                    charList as CharacterItem[]
                ).filter((x) => x.id !== this.charId);
                this.charList = listWithoutMainCharacter;
                this.filteredCharList = listWithoutMainCharacter;
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
                characterType:
                    characterItem.characterType as unknown as CharType,
            },
            relations: [
                {
                    id: null,
                    type: RelationType.Crush,
                    relationDateStart: null,
                    relationDateEnd: null,
                    arrowFromSource: false,
                },
            ],
        };
        this.relationsForCharacter.push(relationToAdd);

        const relationsArray: any = [];

        const relationsFormGroup = new UntypedFormGroup({
            relations: new UntypedFormArray([]),
        });
        relationsArray.push(relationsFormGroup);

        const typedRelationFormArray = relationsFormGroup.get(
            'relations'
        ) as UntypedFormArray;

        this.relationsFormGroup.setControl(
            '' + characterItem.id,
            new UntypedFormArray(relationsArray)
        );

        const newInputGroup = new UntypedFormGroup({
            id: new UntypedFormControl(null),
            type: new UntypedFormControl(
                RelationType[RelationType.Crush],
                Validators.required
            ),
            relationDateStart: new UntypedFormControl(null),
            relationDateEnd: new UntypedFormControl(null),
            arrowFromSource: new UntypedFormControl(true),
        });

        typedRelationFormArray.push(newInputGroup);

        this.newCharacterForm.reset();
    }

    isSourceCheckboxVisible(relationFG: UntypedFormGroup) {
        const type = relationFG.get('type')?.value as RelationTypeString;
        return (
            type === 'Crush' ||
            type === 'Parent' ||
            type === 'Infatuation' ||
            type === 'Pet'
        );
    }
}
