import { CharactersService } from './../../../../core/service/characters.service';
import { Component, OnInit } from '@angular/core';
import { CharacterItem } from 'src/app/modules/characters/models/character-item.model';
import { finalize } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base.component';

@Component({
  selector: 'app-admin-panel-for-main',
  templateUrl: './admin-panel-for-main.component.html',
  styleUrls: ['./admin-panel-for-main.component.scss']
})
export class AdminPanelForMainComponent extends BaseComponent implements OnInit {
  readonly profilePicURL = '/character-profile-pics';

  charList: CharacterItem[];

  loading = true;
  constructor(private _charactersService: CharactersService) {
    super();
  }

  ngOnInit() {
    this.getAllCharacters();
  }

  getAllCharacters() {
    this.loading = true;
    this.subscriptions$.add(
      this._charactersService
        .getAllCharacters()
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(
          charList => {
            this.charList = charList;
            console.log(charList)
          })
    )
  }


  changeStateOfChar(id: number) {

  }
}
