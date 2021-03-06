import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/core/base.component';
import { CharactersService } from 'src/app/core/service/characters.service';
import { StoryRequest } from 'src/app/modules/characters/models/character-story/story-request.model';
import {
    Story,
    IStory,
} from 'src/app/modules/characters/models/character-story/story.model';

@Component({
    selector: 'app-story [story] [color] [charId] [isUserLogged]',
    templateUrl: './story.component.html',
    styleUrls: ['./story.component.scss'],
})
export class StoryComponent extends BaseComponent implements OnInit {
    @Input() story: Story[] = [];
    @Input() color: string = '';
    @Input() isUserLogged: boolean = false;
    @Input() charId: number = 0;

    @Output() storyChangedEvent = new EventEmitter<true>();

    editedStoryId: number = 0;

    get canAddMoreStories() {
        return !this.story.find((s) => s.id === 0);
    }

    form = new FormGroup({
        title: new FormControl('', Validators.required),
        story: new FormControl('', Validators.required),
    });

    constructor(
        private _toastrService: ToastrService,
        private _translate: TranslateService,
        private _charactersService: CharactersService
    ) {
        super();
    }

    ngOnInit(): void {}

    setStoryToEdit(story: Story) {
        this.editedStoryId = story.id;
        this.form.get('title')?.setValue(story.title);
        this.form.get('story')?.setValue(story.story);
    }

    cancelEditMode() {
        this.editedStoryId = 0;
    }

    insertDeleteInfo() {
        this._toastrService.warning(
            this._translate.instant('TOASTR_MESSAGE.DELETE_INFO')
        );
    }

    deleteStory(storyId: number) {
        if (storyId === 0) {
            this.story = this.story.filter((s) => s.id !== 0);
            return;
        }
        this.subscriptions$.add(
            this._charactersService.deleteStory(storyId).subscribe(
                (_) => {
                    this._toastrService.success(
                        this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS')
                    );
                    this.storyChangedEvent.emit();
                },
                (err) => {
                    this._toastrService.error(
                        this._translate.instant('TOASTR_MESSAGE.ERROR')
                    );
                }
            )
        );
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(
            event.container.data,
            event.previousIndex,
            event.currentIndex
        );

        const ids = this.story.map((x) => x.id);

        this.subscriptions$.add(
            this._charactersService
                .putStoriesIndexes(ids, this.charId)
                .subscribe(
                    (_) => {
                        this.storyChangedEvent.emit(true);
                    },
                    (err) => {
                        this._toastrService.error(
                            this._translate.instant('TOASTR_MESSAGE.ERROR')
                        );
                    }
                )
        );
    }

    upsertStory() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }

        const objToSend = new StoryRequest(
            this.form.value,
            this.charId,
            this.editedStoryId
        );

        this.subscriptions$.add(
            this._charactersService
                .upsertStoryForCharacter(objToSend)
                .subscribe(
                    (_) => {
                        this._toastrService.success(
                            this._translate.instant(
                                'TOASTR_MESSAGE.SAVE_SUCCESS'
                            )
                        );
                        this.storyChangedEvent.emit();
                        this.form.reset();
                    },
                    (err) => {
                        this._toastrService.error(
                            this._translate.instant('TOASTR_MESSAGE.ERROR')
                        );
                    }
                )
        );
    }

    addNewQuote() {
        const newStory: IStory = {
            id: 0,
            title: '',
            story: '',
        };
        this.story.push(newStory);
        this.editedStoryId = 0;
        this.form.get('title')?.setValue('');
        this.form.get('story')?.setValue('');
    }
}
