import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/core/service/characters.service';
import { CharacterItem } from 'src/app/model/characters/character-item.model';

@Component({
  selector: 'app-characters-menu',
  templateUrl: './characters-menu.component.html',
  styleUrls: ['./characters-menu.component.scss']
})
export class CharactersMenuComponent implements OnInit {

  charList: CharacterItem[] | null = null;

  constructor(private _charactersService: CharactersService) { }

  ngOnInit() {
    this._charactersService.charList$.subscribe(charList => this.charList = charList)
  }


}
