import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/core/base.component';
import { CharactersService } from 'src/app/core/service/characters.service';
import { insertDeleteInfo } from 'src/app/modules/shared/functions/insert-delete.info';

import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';

@Component({
    selector: 'app-story [story][charId] [isUserLogged]',
    templateUrl: './story.component.html',
    styleUrls: ['./story.component.scss'],
})
export class StoryComponent extends BaseComponent implements OnInit {
    @Input() story: string = '';
    @Input() isUserLogged: boolean = false;
    @Input() charId: number = 0;

    @Output() storyChangedEvent = new EventEmitter<true>();

    wereAnyChangesMade = false;

    public Editor = InlineEditor;

    public model = {
        editorData: '',
    };

    insertDeleteInfo = () =>
        insertDeleteInfo(this._toastrService, this._translate);

    constructor(
        private _toastrService: ToastrService,
        private _translate: TranslateService,
        private _charactersService: CharactersService
    ) {
        super();
        document.documentElement.style.setProperty(
            '--ck-color-base-border',
            document.documentElement.style.getPropertyValue('--theme-color')
        );
    }

    ngOnInit(): void {
        this.model.editorData =
            this._charactersService.form.get('story')?.value;
    }
    onReady(eventData: { plugins: any }) {
        eventData.plugins.get('FileRepository').createUploadAdapter =
            function (loader: { file: Promise<Blob> }) {
                return new UploadAdapter(loader);
            };
    }

    saveStory() {
        this.storyChangedEvent.emit();

        this.model.editorData =
            this._charactersService.form.get('story')?.value;
        // console.log(this._charactersService.form.get('story')?.value);
        // console.log(this.model.editorData);
    }

    onEditorChanges() {
        this.wereAnyChangesMade = true;
        this._charactersService.form
            .get('story')
            ?.setValue(this.model.editorData);
    }
}

class UploadAdapter {
    loader: { file: Promise<Blob> };
    constructor(loader: { file: Promise<Blob> }) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file.then(
            (file: Blob) =>
                new Promise((resolve) => {
                    const myReader = new FileReader();
                    myReader.onloadend = () => {
                        resolve({ default: myReader.result });
                    };

                    myReader.readAsDataURL(file);
                })
        );
    }
}
