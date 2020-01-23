import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/core/service/characters.service';
import { CharacterItem } from 'src/app/modules/characters/models/character-item.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-characters-menu',
  templateUrl: './characters-menu.component.html',
  styleUrls: ['./characters-menu.component.scss']
})
export class CharactersMenuComponent implements OnInit {

  charList: CharacterItem[] | null = null;
  loading = true;

  constructor(private _charactersService: CharactersService) { }

  ngOnInit() {
    this._charactersService
      .charList$
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(charList => {
        this.charList = charList;
        this.loading = false;
      }
      )
  }


}
