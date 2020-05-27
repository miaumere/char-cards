import { CharactersService } from './../../../../core/service/characters.service';
import { BaseComponent } from 'src/app/core/base.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterItem } from 'src/app/modules/characters/models/character-item.model';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent extends BaseComponent implements OnInit {
  charId: number;
  selectedCharacter?: CharacterItem;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _characterService: CharactersService
  ) { super(); }

  ngOnInit() {

    this._activatedRoute?.parent?.queryParams
      .subscribe(queryParam => {
        this.charId = +queryParam.id;
      });
    this.getCharacter();
  }

  getCharacter() {
    this.subscriptions$.add(
      this._characterService
        .getCharacters()
        .subscribe(charList => {
          this.selectedCharacter = charList.find(x => x.id === this.charId);
        })
    )
  }

}
