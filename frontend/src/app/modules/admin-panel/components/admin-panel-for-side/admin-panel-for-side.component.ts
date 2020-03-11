import { ToastrService } from 'ngx-toastr';
import { SideCharactersService } from 'src/app/core/service/side-characters.service';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { SideCharForChange } from '../../models/side-char-for-change.model';
import { BaseComponent } from 'src/app/core/base.component';
import { SideCharacterForListItem } from 'src/app/modules/side-characters/models/side-character-for-list-item.model';

@Component({
  selector: 'app-admin-panel-for-side',
  templateUrl: './admin-panel-for-side.component.html',
  styleUrls: ['./admin-panel-for-side.component.scss']
})
export class AdminPanelForSideComponent extends BaseComponent implements OnInit {
  loading = true;
  sideChars: SideCharacterForListItem[];
  constructor(
    private _sideCharacterService: SideCharactersService,
    private _toastrService: ToastrService) {
    super();
  }

  ngOnInit() {
    this.getAllSideCharacters();
  }

  getAllSideCharacters() {
    this.loading = true;
    this.subscriptions$.add(
      this._sideCharacterService.
        getAllSideCharacters()
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(sideChars => {
          this.sideChars = sideChars;
        }
        )
    )
  }

  changeStateOfChar(id: number) {
    const matchingChar = this.sideChars.find(c =>
      c.externalId === id
    );

    if (matchingChar) {
      this.subscriptions$.add(
        this._sideCharacterService
          .patchSideCharacterState(new SideCharForChange(id, !matchingChar.archived))
          .subscribe(_ => {
            this._toastrService.success('Udało się zmienić stan zaznaczonej postaci.');
            this.getAllSideCharacters();
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
