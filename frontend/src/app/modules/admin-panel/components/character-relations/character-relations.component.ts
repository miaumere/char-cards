import { CharType } from 'src/app/modules/admin-panel/enums/character-type.enum';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/core/base.component';

@Component({
    selector: 'app-character-relations',
    templateUrl: './character-relations.component.html',
    styleUrls: ['./character-relations.component.scss'],
})
export class CharacterRelationsComponent extends BaseComponent {
    // readonly RelationshipType = RelationshipType;
    // characterListOne: HTMLSelectElement | null = null;
    // characterListTwo: HTMLSelectElement | null = null;
    // @ViewChild('characterListOne')
    // set setCharacterListOne(v: any) {
    //     setTimeout(() => {
    //         this.characterListOne = v?.nativeElement;
    //     }, 0);
    // }
    // @ViewChild('characterListTwo')
    // set setCharacterListTwo(v: any) {
    //     setTimeout(() => {
    //         this.characterListTwo = v?.nativeElement;
    //     }, 0);
    // }
    // changeType: string | null = null;
    // charList: CharacterItem[] = [];
    // filteredCharacters = new Observable<CharacterItem[]>();
    // filteredCharacters2 = new Observable<CharacterItem[]>();
    // selectedCharacter?: CharacterItem;
    // relationshipsList: RelationshipsForCharacter[] = [];
    // relationForm = new FormGroup({
    //     firstChar: new FormControl(''),
    //     secondChar: new FormControl(''),
    //     firstCharReversed: new FormControl(''),
    //     secondCharReversed: new FormControl(''),
    //     relation: new FormControl(),
    //     reverseRelation: new FormControl(-1),
    // });
    // charId: number = 0;
    // type: 'new' | 'edit' = 'new';
    // constructor(
    //     private _toastrService: ToastrService,
    //     private _characterService: CharactersService,
    //     private _activatedRoute: ActivatedRoute,
    //     private _translate: TranslateService
    // ) {
    //     super();
    // }
    // private _filterCharacters(value: string) {
    //     const filterValue = value.toLowerCase();
    //     return this.charList.filter(
    //         (c) =>
    //             `${c.charName} ${c.charSurname}`
    //                 .toLowerCase()
    //                 .indexOf(filterValue) === 0
    //     );
    // }
    // ngOnInit() {
    //     this._activatedRoute?.parent?.queryParams.subscribe(
    //         (queryParam: any) => {
    //             this.charId = +queryParam.id;
    //         }
    //     );
    //     if (this._activatedRoute?.parent?.params) {
    //         this.subscriptions$.add(
    //             this._activatedRoute.params.subscribe((param: any) => {
    //                 this.type = param.type;
    //                 switch (this.type) {
    //                     case 'new':
    //                         this.getCharactersList();
    //                         this.relationForm.controls['secondChar'].disable();
    //                         this.relationForm.controls[
    //                             'firstCharReversed'
    //                         ].disable();
    //                         break;
    //                     case 'edit':
    //                         this.getCharactersList();
    //                         this.getRelationshipsForCharacter();
    //                         break;
    //                 }
    //             })
    //         );
    //     }
    //     this.relationForm.get('firstChar')?.valueChanges.subscribe((x) => {
    //         this.relationForm.get('firstCharReversed')?.setValue(x);
    //     });
    //     this.relationForm
    //         .get('secondCharReversed')
    //         ?.valueChanges.subscribe((x) => {
    //             this.relationForm.get('secondChar')?.setValue(x);
    //         });
    //     this.relationForm.get('relation')?.disable();
    //     this.relationForm
    //         .get('reverseRelation')
    //         ?.valueChanges.subscribe(this.changeRelationType.bind(this));
    // }
    // changeRelationType() {
    //     const value = this.relationForm.get('reverseRelation')?.value;
    //     switch (value) {
    //         case RelationshipType.PARENT:
    //             this.relationForm
    //                 .get('relation')
    //                 ?.setValue(
    //                     this._translate.instant(
    //                         'enum.relationshipType.' + RelationshipType[1]
    //                     )
    //                 );
    //             break;
    //         case RelationshipType.CHILD:
    //             this.relationForm
    //                 .get('relation')
    //                 ?.setValue(
    //                     this._translate.instant(
    //                         'enum.relationshipType.' + RelationshipType[0]
    //                     )
    //                 );
    //             break;
    //         case RelationshipType.MARRIAGE:
    //             this.relationForm
    //                 .get('relation')
    //                 ?.setValue(
    //                     this._translate.instant(
    //                         'enum.relationshipType.' + RelationshipType[2]
    //                     )
    //                 );
    //             break;
    //     }
    // }
    // getCharactersList() {
    //     this.subscriptions$.add(
    //         this._characterService.getCharacters().subscribe((charList) => {
    //             this.charList = charList as any;
    //             this.filteredCharacters = this.relationForm.controls[
    //                 'firstChar'
    //             ].valueChanges.pipe(
    //                 startWith(''),
    //                 map((character) =>
    //                     character
    //                         ? this._filterCharacters(character)
    //                         : this.charList
    //                 )
    //             );
    //             this.filteredCharacters2 = this.relationForm.controls[
    //                 'secondCharReversed'
    //             ].valueChanges.pipe(
    //                 startWith(''),
    //                 map((character) =>
    //                     character
    //                         ? this._filterCharacters(character)
    //                         : this.charList
    //                 )
    //             );
    //             this.selectedCharacter = charList.find(
    //                 (x) => x.id === this.charId
    //             );
    //         })
    //     );
    // }
    // createNewRelation() {
    //     const firstChar = this.charList.find(
    //         (c) => c.fullName === this.relationForm.get('firstChar')?.value
    //     );
    //     const secondChar = this.charList.find(
    //         (c) => c.fullName === this.relationForm.get('secondChar')?.value
    //     );
    //     const relation = this.relationForm.get('relation')?.value;
    //     const reverseRelation = this.relationForm.get('reverseRelation')?.value;
    //     let relationType = '';
    //     for (const key in RelationshipType) {
    //         if (RelationshipType.hasOwnProperty(key)) {
    //             const element = RelationshipType[key];
    //             if (
    //                 relation ===
    //                 this._translate.instant('enum.relationshipType.' + element)
    //             ) {
    //                 relationType = element;
    //                 break;
    //             }
    //         }
    //     }
    //     if (!firstChar || !secondChar) {
    //         this._toastrService.error(
    //             this._translate.instant('TOASTR_MESSAGE.NO_CHARACTER')
    //         );
    //         return;
    //     } else if (relation === null || reverseRelation === null) {
    //         this._toastrService.error(
    //             this._translate.instant('TOASTR_MESSAGE.NO_RELATION_TYPE')
    //         );
    //         return;
    //     }
    //     const request: any = {
    //         charId: firstChar.id,
    //         relCharId: secondChar.id,
    //         relation: relationType,
    //         reverseRelation: RelationshipType[reverseRelation],
    //     };
    //     this.subscriptions$.add(
    //         this._characterService.postNewRelationship(request).subscribe(
    //             (_) => {
    //                 this._toastrService.success(
    //                     this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS')
    //                 );
    //                 this.relationForm.reset();
    //             },
    //             (error) => {
    //                 this._toastrService.error(
    //                     this._translate.instant('TOASTR_MESSAGE.ERROR')
    //                 );
    //             }
    //         )
    //     );
    // }
    // getRelationshipsForCharacter() {
    //     this.subscriptions$.add(
    //         this._characterService
    //             .getRelationshipsForCharacter(this.charId)
    //             .subscribe((relations) => {
    //                 this.relationshipsList = relations;
    //             })
    //     );
    // }
    // editRelation(relatedCharacterId: number, targetValue: number) {
    //     const objToSend = new EditRelationship();
    //     objToSend.characterId = this.charId;
    //     objToSend.relatedCharacterId = relatedCharacterId;
    //     objToSend.relationType = RelationshipType[targetValue];
    //     switch (RelationshipType[targetValue]) {
    //         case RelationshipType[0]:
    //             objToSend.reversedRelationType = RelationshipType[1];
    //             break;
    //         case RelationshipType[1]:
    //             objToSend.reversedRelationType = RelationshipType[0];
    //             break;
    //         case RelationshipType[2]:
    //             objToSend.reversedRelationType = RelationshipType[2];
    //             break;
    //     }
    //     this.subscriptions$.add(
    //         this._characterService.patchRelationship(objToSend).subscribe(
    //             (_) => {
    //                 this._toastrService.success(
    //                     this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS')
    //                 );
    //                 this.getRelationshipsForCharacter();
    //             },
    //             (err) => {
    //                 this._toastrService.error(
    //                     this._translate.instant('TOASTR_MESSAGE.ERROR')
    //                 );
    //             }
    //         )
    //     );
    // }
    // deleteRelation(relatedCharacterId: number) {
    //     this.subscriptions$.add(
    //         this._characterService
    //             .deleteRelationship(this.charId, relatedCharacterId)
    //             .subscribe(
    //                 (_) => {
    //                     this._toastrService.success(
    //                         this._translate.instant(
    //                             'TOASTR_MESSAGE.SAVE_SUCCESS'
    //                         )
    //                     );
    //                     this.getRelationshipsForCharacter();
    //                 },
    //                 (err) => {
    //                     this._toastrService.error(
    //                         this._translate.instant('TOASTR_MESSAGE.ERROR')
    //                     );
    //                 }
    //             )
    //     );
    // }
}
