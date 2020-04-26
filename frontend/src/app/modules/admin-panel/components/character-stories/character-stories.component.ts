import { CharactersService } from 'src/app/core/service/characters.service';
import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { Story } from '../../models/story.model';

@Component({
  selector: 'app-character-stories',
  templateUrl: './character-stories.component.html',
  styleUrls: ['./character-stories.component.scss']
})

export class CharacterStoriesComponent extends BaseComponent implements OnInit {
  @Input() charId: number;
  stories: Story[] = [];

  constructor(private _charactersService: CharactersService) { super(); }

  ngOnInit() {
    this.getStories();

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


}
