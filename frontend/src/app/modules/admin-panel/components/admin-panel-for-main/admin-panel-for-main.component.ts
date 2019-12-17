import { CharacterForChange } from './../../models/character-for-change.model';
import { ToastrService } from 'ngx-toastr';
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
  constructor(private _charactersService: CharactersService, private _toastrService: ToastrService) {
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
          })
    )
  }


  changeStateOfChar(id: number) {
    const matchingChar = this.charList.find(c =>
      c.id === id
    );
    if (matchingChar) {
      this.subscriptions$.add(
        this._charactersService
          .patchCharactersState(new CharacterForChange(id, !matchingChar.archived))
          .subscribe(_ => {
            this._toastrService.success('Udało się zmienić stan zaznaczonej postaci.');
            this.getAllCharacters();
          },
            err => {
              if (err && err.error) {
                this._toastrService.error(err.error);
              }
            })
      )
    }
  }
}
