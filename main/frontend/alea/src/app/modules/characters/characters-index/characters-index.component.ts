import { CharacterItem } from 'src/app/model/characters/character-item.model';
import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/core/service/characters.service';

@Component({
  selector: 'app-characters-index',
  templateUrl: './characters-index.component.html',
  styleUrls: ['./characters-index.component.scss']
})
export class CharactersIndexComponent implements OnInit {

  constructor(private _charactersService: CharactersService) { }

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters() {
    this._charactersService.getCharacters().subscribe(
      response => {

      }
    )
  }
}
