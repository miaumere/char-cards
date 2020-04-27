import { ToastrService } from 'ngx-toastr';
import { CharactersService } from 'src/app/core/service/characters.service';
import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { Story } from '../../models/story.model';
import { CharacterItem } from 'src/app/modules/characters/models/character-item.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-character-stories',
  templateUrl: './character-stories.component.html',
  styleUrls: ['./character-stories.component.scss']
})

export class CharacterStoriesComponent extends BaseComponent implements OnInit {
  @Input() charId: number;
  stories: Story[] = [];
  selectedCharacter?: CharacterItem;

  constructor(
    private _charactersService: CharactersService,
    private _toastrService: ToastrService) { super(); }

  ngOnInit() {
    this.getCharacter();
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
          this._toastrService.error('Nie udało się zmienić kolejności historii.');
        })
    )
  }

  getCharacter() {
    this.subscriptions$.add(
      this._charactersService
        .getCharacters()
        .subscribe(charList => {
          this.selectedCharacter = charList.find(x => x.id === this.charId);
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
    this._toastrService.warning('Aby usunąć wybrany element, naciśnij dwa razy.');
  }

  deleteStory(storyId: number) {
    this.subscriptions$.add(
      this._charactersService
        .deleteStory(storyId)
        .subscribe(_ => {
          this._toastrService.success('Udało się usunąć wybraną historię!');
          this.getStories();
        }, err => {
          this._toastrService.error('Nie udało się usunąć wybranej historii.')
        })
    )
  }
}
