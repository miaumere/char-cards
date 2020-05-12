import { StarringType } from './../../../../enums/StarringType.enum';
import { StarringCharacter, IStarringCharacter } from './../../../../models/starring/starring-character.model';
import { CharactersService } from './../../../../../../core/service/characters.service';
import { ToastrService } from 'ngx-toastr';
import { StoryService } from 'src/app/core/service/story.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';

import * as tinycolor from 'tinycolor2';
import { Page } from 'src/app/modules/pages/models/pages/page.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CharacterItem } from 'src/app/modules/characters/models/character-item.model';
import { finalize, startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IEditStarringCharacter } from 'src/app/modules/edit-story-panel/models/starring/edit-starring-character.model';

@Component({
  selector: 'app-edit-pages-menu',
  templateUrl: './edit-pages-menu.component.html',
  styleUrls: ['./edit-pages-menu.component.scss']
})
export class EditPagesMenuComponent extends BaseComponent implements OnInit {
  private readonly pageURL = '/api/stories/get-images';
  readonly StarringType = StarringType;


  fontColor = 'white';
  bookColor: string;
  bookId: number;

  pagesNumber: number[] = [];

  filesListNumber = 0;
  fileList: FileList;

  chapterId: number;

  editedCharacterId: number;

  charactersInChapterForm = new FormGroup({
    character: new FormControl('', Validators.required),
    starringType: new FormControl('', Validators.required)
  });

  charList: CharacterItem[] = [];
  filteredCharacters = new Observable<CharacterItem[]>();
  selectedCharacter?: CharacterItem;

  starringCharacters: StarringCharacter[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _storyService: StoryService,
    private _toastrService: ToastrService,
    private _characterService: CharactersService
  ) { super(); }

  ngOnInit() {
    this._activatedRoute?.parent?.queryParams
      .subscribe(queryParam => {
        this.chapterId = +queryParam.chapterId;
        this.bookColor = queryParam.color;
        this.fontColor = queryParam.fontColor;
        this.bookId = +queryParam.id;
        this.getChapter(this.chapterId);
        this.getStarringCharactersForChapter()
      });

    this.getCharactersList();

  }

  private _filterCharacters(value: string) {
    const filterValue = value.toLowerCase();

    return this.charList.filter(c => `${c.charName} ${c.charSurname}`.toLowerCase().indexOf(filterValue) === 0);
  }


  getChapter(id: number) {
    this.subscriptions$.add(
      this._storyService
        .getChaptersForBook(this.bookId)
        .pipe(
          map(arr => arr.find(x => x.id === id)
          )
        ).subscribe(chapter => {
          if (chapter?.pagesIds) {
            this.pagesNumber = chapter.pagesIds;
          }
        })
    )
  }

  getCharactersList() {

    this.subscriptions$.add(
      this._characterService
        .getCharacters()
        .subscribe(charList => {
          this.charList = charList;

          this.filteredCharacters = this.charactersInChapterForm.controls['character'].valueChanges
            .pipe(
              startWith(''),
              map(character => character ? this._filterCharacters(character) : this.charList)
            );
        })
    );
  }

  getStarringCharactersForChapter() {
    this.subscriptions$.add(
      this._storyService
        .getStarringCharactersForChapter(this.chapterId)
        .subscribe(starringCharacters => {
          this.starringCharacters = starringCharacters;
        })
    )
  }

  insertDeleteInfo() {
    this._toastrService.warning('Aby usunąć element, naciśnij dwa razy.');
  }

  onFileInput(fileList: FileList) {
    this.fileList = fileList;
    this.filesListNumber = fileList.length;
  }

  drop(e: CdkDragDrop<string[]>) {
    const number = this.pagesNumber[e.previousIndex]
    this.pagesNumber.splice(e.previousIndex, 1);
    this.pagesNumber.splice(e.currentIndex, 0, number);

    const ids: number[] = [];
    for (const key in this.pagesNumber) {
      if (this.pagesNumber.hasOwnProperty(key)) {
        const element = this.pagesNumber[key];
        ids.push(element);
      }
    }

    this.subscriptions$.add(
      this._storyService
        .patchPageSequence(ids, this.chapterId)
        .subscribe(_ => {
          this.getChapter(this.chapterId);
        }, err => {
          this._toastrService.error('Nie udało się zmienić kolejności stron.')
        })
    )
  }

  addNewPages() {
    const formData = new FormData();
    if (this.fileList) {
      for (let i = 0; i < this.fileList.length; i++) {
        formData.append('image' + i, this.fileList[i]);
      }
    }

    this.subscriptions$.add(
      this._storyService
        .postPages(
          formData, this.chapterId
        ).subscribe(_ => {
          this._toastrService.success('Udało się dodać nowe strony!');
          this.getChapter(this.chapterId)
        }, err => {
          this._toastrService.error('Nie udało się dodać nowych stron.');
        })
    )

  }

  createStarringCharacter() {
    const charFormValue = this.charactersInChapterForm.get('character')?.value;
    if (charFormValue) {
      const foundChar = this.charList.find(c => `${c.charName} ${c.charSurname}`.toLowerCase() === charFormValue.toLowerCase());


      if (foundChar) {
        const objToSend: IEditStarringCharacter = {
          id: this.editedCharacterId ? +this.editedCharacterId : null,
          characterId: foundChar.id,
          chapterId: this.chapterId,
          starringType: StarringType[this.charactersInChapterForm.get('starringType')?.value]
        };

        this.subscriptions$.add(
          this._storyService
            .postStarringCharacters(
              objToSend
            ).subscribe(_ => {
              this._toastrService.success('Udało się dodać postać do części!');
              this.getStarringCharactersForChapter();
            }, err => {
              this._toastrService.error('Nie udało się dodać postaci do części.')
            })
        )
      }
    }




  }

  deletePage(pageId: number) {
    this.subscriptions$.add(
      this._storyService
        .deletePage(pageId)
        .subscribe(_ => {
          this._toastrService.success('Udało się usunąć wybraną stronę!');
          this.getChapter(this.chapterId);
        }, err => {
          this._toastrService.error('Nie udało się usunąć wybranej części.');
        })
    )
  }

  deleteStarringCharacter(starringId: number) {
    this.subscriptions$.add(
      this._storyService
        .deleteCharFromChapter(starringId)
        .subscribe(_ => {
          this._toastrService.success('Udało się usunąć postać z części!');
          this.getStarringCharactersForChapter();
        }, err => {
          this._toastrService.error('Nie udało się usunąć postaci z części.');
        })
    )
  }
}
