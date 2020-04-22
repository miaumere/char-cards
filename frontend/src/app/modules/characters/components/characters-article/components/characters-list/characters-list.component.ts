import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/core/service/characters.service';
import { CharacterItem } from 'src/app/modules/characters/models/character-item.model';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/core/base.component';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent extends BaseComponent implements OnInit {

  charList: CharacterItem[] | null = null;
  loading = true;

  constructor(private _charactersService: CharactersService, private _route: ActivatedRoute) { super(); }

  ngOnInit() {
    // Sposob pobierania danych z servisu bez resolvera
    this.subscriptions$.add(
      this._charactersService
        .charList$
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(charList => {

          let charactersList: any = [];
          const mainCharacters = charList?.filter(x => x.characterType === 'MAIN');

          const sideCharacters = charList?.filter(x => x.characterType === 'SIDE');

          const bgCharacters = charList?.filter(x => x.characterType === 'BACKGROUND');

          if (!!mainCharacters) {
            charactersList = mainCharacters;
          }

          if (!!sideCharacters) {
            charactersList = charactersList.concat(sideCharacters);
          }
          if (!!bgCharacters) {
            charactersList = charactersList.concat(bgCharacters);
          }

          // console.log(charactersList)
          this.charList = charactersList;


          this.loading = false;
        })
    );
  }

}
