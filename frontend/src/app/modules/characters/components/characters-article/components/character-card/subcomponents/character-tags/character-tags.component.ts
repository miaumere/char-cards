import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/core/base.component';
import { TagsService } from 'src/app/core/service/tags.service';
import { Character } from 'src/app/modules/characters/models/character.model';
import { insertDeleteInfo } from 'src/app/modules/shared/functions/insert-delete.info';
import { Tag } from 'src/app/modules/tags/models/tag.model';

@Component({
    selector: 'app-character-tags [isUserLogged] [character]',
    templateUrl: './character-tags.component.html',
    styleUrls: ['./character-tags.component.scss'],
})
export class CharacterTagsComponent extends BaseComponent implements OnInit {
    @Input() isUserLogged: boolean = false;
    @Input() character: Character | null = null;

    @Output() infoHasChangedEvent = new EventEmitter();

    filteredTagsList: Tag[] = [];
    tagsList: Tag[] = [];

    insertDeleteInfo = () =>
        insertDeleteInfo(this._toastrService, this._translate);

    newTagForm = new UntypedFormGroup({
        tagToAdd: new UntypedFormControl(null),
    });

    constructor(
        private _tagsService: TagsService,
        private _toastrService: ToastrService,
        private _translate: TranslateService
    ) {
        super();
    }

    ngOnInit(): void {
        if (this.isUserLogged) {
            this.getTags();
            this.newTagForm.get('tagToAdd')?.valueChanges.subscribe((value) => {
                this._filterTags(value);
            });
        }
    }

    private _filterTags(value: string) {
        if (!value) {
            this.filteredTagsList = this.tagsList;
            return;
        }
        const regex = new RegExp(value, 'gi');

        const filteredTags = this.filteredTagsList.filter((c) => {
            return c.name.match(regex);
        });

        this.filteredTagsList = filteredTags;
    }

    addTagToCharacter(event: MatAutocompleteSelectedEvent) {
        this.newTagForm.get('tagToAdd')?.reset();
        const tag = event.option?.value;
        if (tag.id && this.character?.externalId) {
            this.subscriptions$.add(
                this._tagsService
                    .assignTagToCharacter(tag.id, this.character?.externalId)
                    .subscribe(() => {
                        this.infoHasChangedEvent.emit();
                    })
            );
        }
    }

    getTags() {
        this.subscriptions$.add(
            this._tagsService.getAllTags().subscribe((tags) => {
                const otherTags = tags.filter((x) => {
                    return !this.character?.tags.some((y) => y.id === x.id);
                });
                this.tagsList = otherTags;
                this.filteredTagsList = otherTags;
            })
        );
    }

    deleteCharacterTag(tagId: number) {
        if (this.character) {
            this.subscriptions$.add(
                this._tagsService
                    .deleteCharacterTag(tagId, this.character?.externalId)
                    .subscribe(() => {
                        this.infoHasChangedEvent.emit();
                    })
            );
        }
    }
}
