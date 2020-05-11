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

@Component({
  selector: 'app-edit-pages-menu',
  templateUrl: './edit-pages-menu.component.html',
  styleUrls: ['./edit-pages-menu.component.scss']
})
export class EditPagesMenuComponent extends BaseComponent implements OnInit {
  private readonly pageURL = '/api/stories/get-images';
  fontColor = 'white';
  bookColor: string;
  bookId: number;

  pagesNumber: number[] = [];

  filesListNumber = 0;
  fileList: FileList;

  chapterId: number;

  pages: Page[] = [];

  charactersInChapterForm = new FormGroup({
    character: new FormControl('', Validators.required),
  });

  charList: CharacterItem[] = [];
  filteredCharacters = new Observable<CharacterItem[]>();
  selectedCharacter?: CharacterItem;

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
        this.getPages();
        this.getChapter(this.chapterId);
      });

    this.getCharactersList();

  }

  private _filterCharacters(value: string) {
    const filterValue = value.toLowerCase();

    return this.charList.filter(c => `${c.charName} ${c.charSurname}`.toLowerCase().indexOf(filterValue) === 0);
  }

  getPages() {
    this.subscriptions$.add(
      this._storyService
        .getPagesForChapter(this.chapterId)
        .subscribe(pages => {
          this.pages = pages;
          console.log(pages)
        })
    );

  }

  getChapter(id: number) {
    this.subscriptions$.add(
      this._storyService
        .getChaptersForBook(this.bookId)
        .pipe(
          map(arr => arr.find(x => x.id === id)
          )
        ).subscribe(chapter => {
          if (chapter?.pagesNumber) {
            for (let index = 0; index < chapter.pagesNumber; index++) {
              this.pagesNumber.push(index)
            }
            console.log(this.pagesNumber)
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


  insertDeleteInfo() {
    this._toastrService.warning('Aby usunąć stronę, naciśnij dwa razy.');
  }

  onFileInput(fileList: FileList) {
    this.fileList = fileList;
    this.filesListNumber = fileList.length;
  }

  // drop(e: CdkDragDrop<string[]>) {
  //   const page = this.pages[e.previousIndex]
  //   this.pages.splice(e.previousIndex, 1);
  //   this.pages.splice(e.currentIndex, 0, page);

  //   const ids: number[] = [];
  //   for (const key in this.pages) {
  //     if (this.pages.hasOwnProperty(key)) {
  //       const element = this.pages[key];
  //       ids.push(element.id);
  //     }
  //   }

  //   this.subscriptions$.add(
  //     this._storyService
  //       .patchPageSequence(ids, this.chapterId, this.bookId)
  //       .subscribe(_ => {
  //         this.getPages();
  //       }, err => {
  //         this._toastrService.error('Nie udało się zmienić kolejności stron.')
  //       })
  //   )
  // }

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
          formData, this.chapterId, this.bookId
        ).subscribe(_ => {
          this._toastrService.success('Udało się dodać nowe strony!');
          this.getPages();
        }, err => {
          this._toastrService.error('Nie udało się dodać nowych stron.');
        })
    )

  }

  deletePage(order: number) {
    this.subscriptions$.add(
      this._storyService
        .deletePage(order, this.chapterId)
        .subscribe(_ => {
          this._toastrService.success('Udało się usunąć wybraną stronę!');
          this.getChapter(this.chapterId);
        }, err => {
          this._toastrService.error('Nie udało się usunąć wybranej części.');
        })
    )
  }

}
