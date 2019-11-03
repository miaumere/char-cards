import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { Character } from 'src/app/model/characters/character.model';
import { CharactersService } from 'src/app/core/service/characters.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent extends BaseComponent implements OnInit {

  routeId: number = null;
  character: Character;
  characterProfilePicURL: string;

  constructor(
    private _charactersService: CharactersService,
    private _route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this._route.params.subscribe(route => {
      this.routeId = route.id;
      this.characterProfilePicURL = `/characters-images/${this.routeId}`;
      console.log(this._route);
      this.getCharacterById();
    })


  }

  getCharacterById() {
    this._charactersService.getCharacterById(this.routeId)
      .subscribe(character => {
        this.character = character;
      });
  }

}
