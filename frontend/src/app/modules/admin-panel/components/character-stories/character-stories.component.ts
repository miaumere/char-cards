import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { EditStory } from './../../models/character-story/story-to-edit.model';
import { ToastrService } from 'ngx-toastr';
import { CharactersService } from 'src/app/core/service/characters.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { Story } from '../../models/character-story/story.model';
import { CharacterItem } from 'src/app/modules/characters/models/character-item.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NewStory } from '../../models/character-story/new-story.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

export interface IDialogData {
  title: string;
  desc: string;
}

@Component({
  selector: 'app-edit-character-story',
  templateUrl: './edit-character-story.component.html',
  styleUrls: ['./character-stories.component.scss']
})
export class EditCharacterStoryComponent {

  constructor(
    public dialogRef: MatDialogRef<EditCharacterStoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-character-stories',
  templateUrl: './character-stories.component.html',
  styleUrls: ['./character-stories.component.scss']
})


export class CharacterStoriesComponent extends BaseComponent implements OnInit {
  charId: number;
  stories: Story[] = [];

  newStoryForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    desc: new FormControl('', [Validators.required, Validators.maxLength(2000)])
  });

  title: string;
  desc: string;

  constructor(
    private _charactersService: CharactersService,
    private _toastrService: ToastrService,
    private _activatedRoute: ActivatedRoute,
    private _translate: TranslateService,
    public dialog: MatDialog
  ) { super(); }

  ngOnInit() {
    this._activatedRoute?.parent?.queryParams
      .subscribe(queryParam => {
        this.charId = +queryParam.id;
      });

    this.getStories();
  }

  drop(e: CdkDragDrop<string[]>) {
    const story = this.stories[e.previousIndex]
    this.stories.splice(e.previousIndex, 1);
    this.stories.splice(e.currentIndex, 0, story);

    const ids: number[] = [];
    for (const key in this.stories) {
      if (this.stories.hasOwnProperty(key)) {
        const element = this.stories[key];
        ids.push(element.id);
      }
    }
    this.subscriptions$.add(
      this._charactersService
        .putStoriesIndexes(ids, this.charId)
        .subscribe(_ => {
          this.getStories();

        }, err => {
          this._toastrService.error(this._translate.instant('TOASTR_MESSAGE.ERROR'));
        })
    )
  }


  getStories() {
    this.subscriptions$.add(
      this._charactersService
        .getStoriesForCharacter(this.charId)
        .subscribe(stories => {
          this.stories = stories;
          console.log(stories)
        })
    )
  }

  insertDeleteInfo() {
    this._toastrService.warning(this._translate.instant('TOASTR_MESSAGE.DELETE_INFO'));
  }

  deleteStory(storyId: number) {
    this.subscriptions$.add(
      this._charactersService
        .deleteStory(storyId)
        .subscribe(_ => {
          this._toastrService.success(this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS'));
          this.getStories();
        }, err => {
          this._toastrService.error(this._translate.instant('TOASTR_MESSAGE.ERROR'))
        })
    )
  }

  openEditModal(title: string, desc: string, storyId: number) {
    const data: IDialogData = { title, desc };

    const dialogRef = this.dialog.open(EditCharacterStoryComponent, {
      width: '500px',
      data
    });

    this.subscriptions$.add(
      dialogRef.afterClosed().subscribe(result => {
        if (!!result) {
          const objToSend: EditStory = new EditStory();
          objToSend.storyId = storyId;
          objToSend.desc = result.desc;
          objToSend.title = result.title;

          if (objToSend.desc?.length === 0 || objToSend.title?.length === 0) {
            this._toastrService.warning(this._translate.instant('TOASTR_MESSAGE.EMPTY_FIELDS'));
            return;
          }

          this.subscriptions$.add(
            this._charactersService.
              patchStory(objToSend).subscribe(_ => {
                this._toastrService.success(this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS'));
                this.getStories();
              }, err => {
                this._toastrService.error(this._translate.instant('TOASTR_MESSAGE.ERROR'));
              })
          )
        }
      })

    )
  }


  createNewStory() {
    const formValues: { [key: string]: string } = this.newStoryForm.value;
    const objToSend: NewStory = new NewStory();
    objToSend.characterId = this.charId;

    for (const [key, value] of Object.entries(formValues)) {
      objToSend[key] = value;
    }

    this.subscriptions$.add(
      this._charactersService
        .postStoryForCharacter(objToSend)
        .subscribe(_ => {
          this._toastrService.success(this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS'));
          this.getStories();
          this.newStoryForm.reset();
        },
          err => {
            this._toastrService.error(this._translate.instant('TOASTR_MESSAGE.ERROR'));
          }));
  }
}
