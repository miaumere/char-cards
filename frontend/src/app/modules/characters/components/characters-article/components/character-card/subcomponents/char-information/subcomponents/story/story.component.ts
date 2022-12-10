import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    SecurityContext,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {
    UntypedFormGroup,
    UntypedFormControl,
    Validators,
    FormControl,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/core/base.component';
import { CharactersService } from 'src/app/core/service/characters.service';
import { StoryRequest } from 'src/app/modules/characters/models/character-story/story-request.model';
import {
    Story,
    IStory,
} from 'src/app/modules/characters/models/character-story/story.model';
import { insertDeleteInfo } from 'src/app/modules/shared/functions/insert-delete.info';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-story [story][charId] [isUserLogged]',
    templateUrl: './story.component.html',
    styleUrls: ['./story.component.scss'],
})
export class StoryComponent extends BaseComponent implements OnInit {
    @Input() story: Story[] = [];
    @Input() isUserLogged: boolean = false;
    @Input() charId: number = 0;

    @Output() storyChangedEvent = new EventEmitter<true>();

    editedStoryId: number = 0;

    get canAddMoreStories() {
        return !this.story.find((s) => s.id === 0);
    }

    form = new UntypedFormGroup({
        title: new FormControl('', Validators.required),
        story: new UntypedFormControl('', Validators.required),
    });

    public Editor = ClassicEditor;
    html: SafeHtml | null = null;

    public config = {
        fontFamily: {
            options: [
                'default',
                'Ubuntu, Arial, sans-serif',
                'Ubuntu Mono, Courier New, Courier, monospace',
            ],
        },
    };

    public model = {
        editorData: '<p>Hello, world!</p>',
        // plugins: [ Font, ... ],
    };

    insertDeleteInfo = () =>
        insertDeleteInfo(this._toastrService, this._translate);

    constructor(
        private _toastrService: ToastrService,
        private _translate: TranslateService,
        private _charactersService: CharactersService,
        private _sanitizer: DomSanitizer
    ) {
        super();
        document.documentElement.style.setProperty(
            '--ck-color-base-border',
            document.documentElement.style.getPropertyValue('--theme-color')
        );
    }

    ngOnInit(): void {}

    xxx() {
        console.log('model: ', this.model);
        this.html = this._sanitizer.bypassSecurityTrustHtml(
            this.model.editorData
        );
    }

    setStoryToEdit(story: Story) {
        this.editedStoryId = story.id;
        this.form.get('title')?.setValue(story.title);
        this.form.get('story')?.setValue(story.story);
    }

    cancelEditMode() {
        this.editedStoryId = 0;
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
