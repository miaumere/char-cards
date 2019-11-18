import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/core/service/characters.service';
import { CharacterItem } from 'src/app/model/characters/character-item.model';
import { ActivatedRouteSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/core/base.component';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent extends BaseComponent implements OnInit {

  charList: CharacterItem[] | null = null;
  profilePicURL: '/character-profile-pics';

  constructor(private _charactersService: CharactersService, private _route: ActivatedRoute) { super(); }

  ngOnInit() {
    // Sposob pobierania danych z servisu bez resolvera
    this.subscriptions$.add(
      this._charactersService.charList$.subscribe(charList => {
        console.log('CHARACTERS LIST SUBUJE LISTE POSTACI Z SERVISU 2:', charList);
        this.charList = charList;
      })
    );
  }

}
